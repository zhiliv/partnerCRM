import jwt from 'jsonwebtoken'
import { db } from '~/server/db'
import { QueryArrayResult } from 'pg'
import type { VerifyJWT, User } from '~/types/User'
import { AuthLogger } from '~/types/Auth'
// const config = useRuntimeConfig() // получение данных конфигурации

/**
 * Получение пользователя по идентификатору
 * @function getUser
 * @param {Number} id - Идентификатор пользователя
 */
const getUser = async (id: number | null): Promise<AuthLogger | null | any> => {
  if(!id) { // Проверка на то что идентификатор передан
    return null
  }

  try {
    const sql: string = `
      SELECT 
        id,
        user,
        hash_pwd,
        created_date,
        updated_date,
        email
      FROM access.users WHERE id=$1 LIMIT 1`
    const resultQuery: QueryArrayResult = await db.query(sql, [id])


    if(!resultQuery) {
      return 'Не найдены данные о пользователе'
    }
    if(!resultQuery.rows.length) {
      return 'Не найдены данные о пользователе'
    }

    const rows = resultQuery.rows
    const result: any = rows[0]

    return result
  }
  catch(err) {
    console.error('Ошибка: ', err)
    return null
  }

}


export default async function (event: any): Promise<User | null | string> {
  const { token } = parseCookies(event) // получение токена
  if(!token) throw new Error('Токен отсутствует') // отправка ошибки, если токена нет

  const verifyJWT: VerifyJWT | any = jwt.verify(token, 'yOzPacWqItuzr0sg5AVMG7dsIfCaoAj0C6Z6GFt5lrKLLxHWl3jlAfWkGlWhSgFz13i50S2lVYTwB3qC') // получение значения верификации JWT по токену
  const id: number | null = verifyJWT?.id // Получение  идентификатор пользователя

  const user: User | null = await getUser(id) // Получение данных о пользователе
  if(!user) {
    return null
  }

  if(!user.id) throw new Error('Пользователь не найден')

  return user
}