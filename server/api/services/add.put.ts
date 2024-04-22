import type { H3Event } from 'h3'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import { db } from '~/server/db'
import { QueryResult } from 'pg'
import format from 'pg-format'

export default defineEventHandler(async (event: H3Event) => {
  const params = await readBody(event) // Параметры запроса
  const response: ResponseHTTP = {
    statusCode: 200,
    message: 'Запись добавлена успешно',
    data: null
  }

  if(!params) {
    response.statusCode = 500
    response.message = 'Ошибка при получении параметров для создания нового сервиса'
    throw createError(response)
  }
  try {
    await db.query('BEGIN') // Начало транзакции
    const item = {
      name: params.name,
      id_group: params.id_group
    } // Параметры для создания объекта
    const sql: string = `INSERT INTO base.services(name, id_group) VALUES($1, $2) RETURNING *`
    const result: QueryResult = await db.query(sql, Object.values(item))

    if(!result) {
      response.statusCode = 500
      response.message = 'Непредвиденная ошибка при создания сервиса'
      throw createError(response)
    }

    const id = result.rows[0].id // Получение идентификатора новой записи

    // Запрос на добавление данных
    const sql_category = `INSERT INTO base.link_service_category(service_id, category_id) VALUES %L RETURNING *`
    const values = params.add_categories_id.map((item: number) => [+id, +item]) // Получение массива для добавления
    const query = format(sql_category, values) // Формирование запроса

    const result_category: QueryResult = await db.query(query)
    if(!result_category) {
      response.statusCode = 500
      response.message = 'Непредвиденная ошибка при создании сервиса'
      throw createError(response)
    }
    await db.query('COMMIT')

    response.statusCode = 200
    response.message = 'Сервис создан успешно'
    response.data = result.rows[0]
  }
  catch(err: any) {
    await db.query('ROLLBACK')
    response.message = `Ошибка добавления сервиса: ${err}`
    response.statusCode = 400
  }
  return response

})