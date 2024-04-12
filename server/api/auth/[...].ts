import { db } from '~/server/db'
import color from 'ansis'
import * as bcrypt from 'bcrypt' // модуль криптографии
import jwt from 'jsonwebtoken'
import moment from 'moment-timezone'
import type { QueryArrayResult, QueryResult } from 'pg'
import type { User } from '~/types/User'
import type { RequestAuth, GetUser, AuthLogger, CheckCountAuth, Count } from '~/types/Auth'
import type { H3Event } from 'h3'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import type { TimeStamp } from '~/types/Time'

const config = useRuntimeConfig() // получение данных конфигурации

/** 
** Получение пользователя из БД
* @function getUser
* @param {Object} params - Объект с параметром, содержащим свойство login
* @return {Object} - Данные о пользователе
*/
const getUser = async (params: RequestAuth): Promise<GetUser> => {
  const result: GetUser = {
    data: null,
    error: null
  }

  if(!params) {
    result.error = 'Параметр отсутствует'
    return result
  }

  const { login } = params // Получение имени пользователя
  if(!login || /[^\w\s]/.test(login)) { // Проверка на наличие небезопасных символов
    result.error = 'Недопустимые символы в логине'
    return result
  }


  try {
    const sql: string = `
      SELECT 
        id, 
        name, 
        hash_pwd,
        created_date,
        updated_date,
        email
      FROM  
        access.users
      WHERE name=$1 LIMIT 1` // Использование параметризованного запроса
    const resUser: QueryResult = await db.query(sql, [login]) // Передача параметра в запрос

    if(!resUser) {
      result.error = 'Не удалось получить пользователя'
      return result
    }

    if(resUser && resUser.rows && resUser.rows.length) { // Проверка полученного результата
      const user: User = resUser.rows[0]
      result.data = user
      return result
    }
    else {
      result.error = `Пользователь ${login} не найден`
    }
  } catch(err: any) {
    result.error = 'Ошибка выполнения запроса:', err
    console.error(color.red('Ошибка выполнения запроса:'), color.green(err)) // Обработка ошибки
    return result
  }
  return result
}


export default defineEventHandler(async (event: H3Event) => {
  const response: ResponseHTTP = {
    statusCode: 400, // установка статуса ответа
    message: 'Ошибка авторизации'
  }

  if(!event) {
    response.message = 'Ошибка при получении данных события при проверке количества попыток авторизации'
    return createError(response)
  }

  await deleteCookie(event, 'token') // Удаление куки
  const params: RequestAuth = await readBody(event) // Получение параметров запроса
  if(!params) {
    response.message = 'Отсутствуют параметры логина и пароля'
    return createError(response)
  }

  if(!params.login || !params.password) {
    response.message = 'Отсутствуют параметры логина или пароля'
    return createError(response)
  }

  const authData: AuthLogger = {
    user_id: null,
    date_auth: null,
    status: null,
    token: null,
    comment: null
  } // Данные для добавления в таблицу "access.auth_logger"


  if(params.login.length < 4 || params.password.length < 5) { // проверка длины логина или пароля
    response.statusCode = 401
    response.message = 'Не валидный логин или пароль'
    return createError(response)
  }

  const userData: GetUser = await getUser(params) // получение пользователя
  if(!userData) { // Проверка на то что данные от пользователя получены
    response.statusCode = 400
    response.message = 'Ошибка при получении пользователя'
    return createError(response)
  }

  if(userData.error) {
    response.statusCode = 400
    response.message = userData.error
    console.error(`Ошибка при получении пользователя: ${userData.error}`)
  }

  const user: User | null | undefined = userData.data // Данные пользователя
  if(!user) { // Проверка на то что данные от пользователя получены
    response.statusCode = 400
    response.message = 'Ошибка при получении пользователя'
    return createError(response)
  }

  if(!user.id) { // Проверка на то что найден идентификатор пользователя
    response.statusCode = 400
    response.message = 'Неверный логин или пароль'
    return createError(response)
  }

  const countAuth: CheckCountAuth = await checkCountAuth(user?.id) // Получение количества подключений
  if(countAuth.error) {
    response.statusCode = 400
    response.message = countAuth.error
    console.error(`Ошибка при проверке количества попыток: ${countAuth.error}`)
  }

  if(countAuth.count === null || countAuth.count === undefined) {
    response.statusCode = 400
    response.message = 'Ошибка безопасности авторизации'
    return createError(response)
  }

  if(countAuth.count !== null || countAuth.count !== undefined) {
    authData.user_id = user?.id
    authData.date_auth = moment().format('YYYY-MM-DD HH:mm:ss')
    authData.status = false
  }

  if(countAuth.count >= 11) { // Если количество попыток превышает 100 то возвращаем ответ о превышении лимита попыток входа
    authData.comment = 'Превышено количество запросов авторизации'
    response.statusCode = 400
    response.message = 'Превышено количество запросов авторизации. Доступ к авторизации будет доступен в течении 5 минут'
    logger(authData) // логирование
    return createError(response)
  }

  let token // переменная для хранения токена
  const checkHash = user?.id ? await bcrypt.compare(params.password, user.hash_pwd) : null // проверка пароля по хэшу
  if(user && user.id && countAuth.count <= 11 && checkHash) {
    token = jwt.sign({ id: user.id }, config.secret_key, { expiresIn: '1d' })
    response.statusCode = 200 // установка статуса
    authData.date_auth = moment().format('YYYY-MM-DD HH:mm:ss') // установка даты авторизации
    authData.token = token // Установка токена
    authData.status = true
    setCookie(event, 'token', token, config.sessionOptions) // Установка в куки токена
    setCookie(event, 'user', user.user, config.sessionOptions) // Установка в куки имени пользователя
    setCookie(event, 'user_id', String(user.id), config.sessionOptions) // Установка в куки идентификатор пользователя
  }
  else {
    authData.id = user.id
    authData.status = false
    authData.comment = 'Неверный логин или пароль'
    response.statusCode = 400 // установка статуса
    response.message = 'Неверный логин или пароль'
  }
  logger(authData) // логирование
  return response
})



/**
 ** Добавление записи в таблицу логера авторизации
 * @function logger
 * @param {Object} data - Данные для записи
 */
const logger = async (data: AuthLogger): Promise<T> => {
  try {
    const sql: string = `
    INSERT INTO 
      access.auth_logger 
    (user_id, date_auth, status, token, comment)
    VALUES($1, $2, $3, $4, $5)`

    await db.query(sql, Object.values(data))
  }
  catch(err: any) {
    console.error('Ошибка при добавлении данных в таблицу логера авторизации(access.auth_logger)', err)
  }
}



/** 
** Проверка количества запросов авторизации по логину
* @function checkCountAuth
* @param {String} login - login адрес клиента
* @return {Number} - Количество записей
*/
const checkCountAuth = async (user_id: number): Promise<CheckCountAuth> => {
  const result: CheckCountAuth = {
    error: null,
    count: null
  } // Результат выполнения функции

  const dateTimeStart: TimeStamp =
    moment()
      .tz("Europe/Moscow")
      .subtract(5, 'minutes')
      .format('YYYY-MM-DD HH:mm:ss') // получение даты минус 5 минут

  const dateTimeEnd: TimeStamp = moment()
    .tz("Europe/Moscow")
    .format('YYYY-MM-DD HH:mm:ss') // Текущая дата  и время 

  if(user_id) {
    try {
      const sql: string =
        `
        SELECT 
          COUNT(*) 
        FROM 
          access.auth_logger
        WHERE 
          created_date 
          BETWEEN '${dateTimeStart}' AND '${dateTimeEnd}'`
      const response: QueryResult = await db.query(sql) // Выполнение запроса
      if(!response) {
        result.error = 'Ошибка при выполнении запроса'
        return result
      }

      const resultCount: Count = response.rows[0] // Получение первого элемента 
      if(!resultCount) {
        result.error = 'Не удалось получить количество запросов авторизации'
        return result
      }

      result.count = resultCount.count
    }
    catch(err: any) {
      result.error = err
      return result
    }
  }
  else {
    result.error = 'Не передан идентификатор пользователя'
    return result
  }
  return result
}