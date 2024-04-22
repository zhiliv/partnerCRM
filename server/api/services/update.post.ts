import type { H3Event } from 'h3'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import { db } from '~/server/db'
import { QueryArrayResult, QueryResult } from 'pg'
import format from 'pg-format'
import { FieldsCategory } from '~/types/Category'

export default defineEventHandler(async (event: H3Event) => {
  const params = await readBody(event) // Параметры запроса
  console.log("🚀 -> defineEventHandler -> params:", params)
  const response: ResponseHTTP = {
    statusCode: 200,
    message: 'Запись обновлена успешно',
    data: null
  }

  if(!params) {
    response.statusCode = 500
    response.message = 'Оши бка при получении параметров для обновления сервиса'
    throw createError(response)
  }

  try {
    const options = {
      id: params.id,
      name: params.name,
      id_group: params.id_group
    }
    await db.query('BEGIN') // Начало транзакции
    const del_sql = 'DELETE FROM base.link_service_category WHERE service_id = $1' // Запрос на удаление данных
    await db.query(del_sql, [options.id])

    const add_sql = `INSERT INTO base.link_service_category(service_id, category_id) VALUES %L RETURNING *`
    const values = params.categories.map((item: FieldsCategory) => [+params.id, item.id]) // Получение массива для добавления
    const add_query = format(add_sql, values) // Формирование запроса
    await db.query(add_query)

    const sql: string = `UPDATE base.services SET name = $2, id_group = $3 WHERE id = $1 RETURNING *`
    const result: QueryResult = await db.query(sql, Object.values(options))

    await db.query('COMMIT')
    if(!result) {
      response.statusCode = 500
      response.message = 'Непредвиденная ошибка при обновлении сервиса'
      throw createError(response)
    }
  }
  catch(err: any) {
    await db.query('ROLLBACK')
    response.statusCode = 400
    response.message = `Ошибка получения списка сервисов в таблице services: ${err.toString()}`
  }
  return response
})