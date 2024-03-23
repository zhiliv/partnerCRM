import { db } from '~/server/db'
import * as bcrypt from 'bcrypt' // модуль криптографии
import jwt from 'jsonwebtoken'
import { EnterAuthData, LoggerAuth, UserAuth } from '~/types/auth'
import { DateNow } from '~/server/utils/time'
import moment from 'moment-timezone'
import { Response } from '~/types/query'
import { schema_users } from '~/schemas/schema_users'
import { authLoggerSchema } from '~/schemas/shema_auth_logger'
import { getColumnFromSchema, removeObjectProperty } from '~/server/utils/helper'
import { QueryArrayResult, QueryResult } from 'pg'
// const config = useRuntimeConfig() // получение данных конфигурации



/** 
** Получение пользователя из БД
* @function getUser
* @param {Object} params - Объект с параметром, содержащим свойство login
* @return {Object} - Данные о пользователе
*/
const getUser = async (params: EnterAuthData): Promise<UserAuth | null> => {
  const { login } = params // Получение имени пользователя
  if(!login || /[^\w\s]/.test(login)) { // Проверка на наличие небезопасных символов
    return null
  }

  try {
    const columns: string[] | null = getColumnFromSchema(schema_users) // Получение колонок схемы
    if(!columns) {
      return null
    }

    const sql: string = `
      SELECT 
        id, 
        name, 
        password_hash,
        created_date,
        update_date,
        email
      FROM  
        ${schema_users.fullPath}  
      WHERE name=$1 LIMIT 1` // Использование параметризованного запроса
    const result: QueryArrayResult = await db.query(sql, [login]) // Передача параметра в запрос

    if(result && result.rows && result.rows.length) { // Проверка полученного результата
      const res: any = result.rows[0]
      return res
    }

    if(!result) {
      return null
    }
  } catch(error) {
    console.error('Ошибка выполнения запроса:', error) // Обработка ошибки
    return null
  }
  return null
}



export default defineEventHandler(async event => {
  if(!event) {
    return null
  }

  await deleteCookie(event, 'token') // Удаление куки
  const params: EnterAuthData = await readBody(event) // Получение параметров запроса

  const response: Response = {
    status: 400, // установка статуса ответа
    message: ''
  }

  const dataAuth: LoggerAuth = {
    // объект данных авторизации
    user_id: null, // Идентификатор пользователя
    date_request: DateNow(), // установка даты запроса
    date_auth: null, // установка даты авторизации
    status: false,// установка статуса
    token: null, // установка токена
  }

  if(params.login.length < 4 || params.password.length < 5) { // проверка длины логина или пароля
    response.status = 200
    response.message = 'Не валидный логин или пароль'
    return createError(response)
  }

  const user: UserAuth | null = await getUser(params)
  if(!user) { // Проверка на то что данные от пользователя получены
    return null
  }

  if(!user.id) { // Проверка на то что найден идентификатор пользователя
    response.status = 401
    response.message = 'Неверный логин или пароль'
    return createError(response)
  }

  const countAuth = await checkCountAuth(user?.id) // Получение количества подключений
  if(countAuth > 100) { // Если количество попыток превышает 100 то возвращаем ответ о превышении лимита попыток входа
    dataAuth.user_id = user?.id
    response.status = 401
    response.message = 'Превышено количество запросов авторизации. Доступ к авторизации будет доступен в течении 5 минут'
    await logger(dataAuth)
    return createError(response)
  }

  let token // переменная для хранения токена
  const checkHash = user?.id ? await bcrypt.compare(params.password, user.password_hash) : null // проверка пароля по хэшу
  if(user && user.id && countAuth <= 500 && checkHash) {
    token = jwt.sign({ id: user.id }, config.secret_key, { expiresIn: '1d' })
    response.status = 200 // установка статуса
    dataAuth.user_id = user.id // установка идентификатора пользователя
    dataAuth.date_auth = DateNow() // установка даты авторизации
    dataAuth.token = token // Установка токена
    setCookie(event, 'token', token, config.sessionOptions) // Установка в куки токена
    setCookie(event, 'user', user.name, config.sessionOptions) // Установка в куки имени пользователя
    setCookie(event, 'user_id', String(user.id), config.sessionOptions) // Установка в куки идентификатор пользователя
    logger(dataAuth) // логирование
    return response
  }
  else {
    dataAuth.user_id = user.id
    response.status = 400 // установка статуса
    response.message = 'Неверный логин или пароль'
    logger(dataAuth) // логирование
    return response
  }
})



/*
 * Добавление записи в таблицу логера авторизации
 * @function logger
 * @param {Object} authData - Данные для записи
 */
const logger = async (authData: LoggerAuth) => {
  const columnsSchema: object = removeObjectProperty(authLoggerSchema.columns, 'id') // Получение списка колонок без идентификатора
  const columns: string[] = Object.keys(columnsSchema) // Получение списка колонок для запроса
  const sql: string = `INSERT INTO accesses.auth_logger(${columns.toString()}) VALUES($1, $2, $3, $4, $5)`
  const response: QueryResult = await db.query(sql, Object.values(authData))
}



/* 
* Проверка количества запросов авторизации по логину
* @function checkCountAuth
* @param {String} login - login адрес клиента
* @return {Number} - Количество записей
*/
const checkCountAuth = async (user_id: number) => {
  if(user_id) {
    const dateTimeStart: string = moment().tz("Europe/Moscow").subtract(5, 'minutes').format('YYYY-MM-DD HH:mm:ss') // получение даты минус 5 минут
    const dateTimeEnd: string = moment().tz("Europe/Moscow").format('YYYY-MM-DD HH:mm:ss') // Текущая дата  и время 

    const sql: string = `SELECT COUNT(*) FROM ${authLoggerSchema.fullPath} WHERE date_request BETWEEN '${dateTimeStart}' AND '${dateTimeEnd}'`
    const response: QueryArrayResult = await db.query(sql) // Выполнение запроса
    
    if(!response || !response.rows || response.rows.length) return false

    const obj_result: any = response.rows[0] // Получение первого элемента 
    if(!obj_result) return false
    const result = obj_result.count// Получение значения свойства 
    return result
  }
    
  else return false
}