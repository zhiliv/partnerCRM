
/** 
** Получение списка всех пользователей
*/
import { H3Event } from 'h3'
import { db } from '~/server/db'

export default defineEventHandler(async (event: H3Event) => {

  const params: any = getQuery(event) // Получение параметров
  if(!params) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка получения параметров для получения списка пользователей'
    })
  }

  if(!params.order) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка получения параметра сортировки'
    })
  }

  try {
    let sql = `
      SELECT
      id,
      user,
      hash_pwd,
      email,
      created_date,
      updated_date
  FROM access.users`
    sql += ` ORDER BY created_date`
    db.query(sql)
  }
  catch(err) {

  }
})