/** 
** Получение списка всех пользователей
*/
import { H3Event } from 'h3'
import { schema_users } from '~/schemas/schema_users'
import { ParamsQuery } from '~/types/params-query'
import { db } from '~/server/db'

export default defineEventHandler(async (event: H3Event) => {
  const columns = getColumnFromSchema(schema_users) // Получение всех колонок таблицы
  if(!columns) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка получения колонок для таблицы users'
    })
  }

  const params: ParamsQuery = getQuery(event) // Получение параметров
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

  const order = JSON.parse(params.order) // Получение параметра для сортировки

  try {
    let sql = `
      SELECT
      ${columns.toString()}
      FROM ${schema_users.schema}.${schema_users.table} `
    if(params.where) sql += getWhereSql(JSON.parse(params.where))
    sql += ` ORDER BY ${order[0][0]} ${order[0][1]}
      LIMIT ${params.limit} OFFSET ${params.offset}
    `
    db.query(sql)
  }
  catch(err) {

  }
})