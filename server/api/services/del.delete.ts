import type { H3Event } from 'h3'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import type { Service } from '~/types/Service'
import type { QueryResult } from 'pg'
import { db } from '~/server/db'

export default defineEventHandler(async (event: H3Event) => {
  const response: ResponseHTTP = {
    statusCode: 200,
    message: 'Сервис удален удален',
    data: null
  }
  const params: Service = await readBody(event) // Параметры запроса
  if(!params || !params.id) {
    response.message = 'Не передан идентификатор сервиса'
    response.statusCode = 500
    throw createError(response)
  }

  const id: number = params.id // Получение идентификатора
  const sql: string = `DELETE FROM base.services WHERE id = $1`
  try {
    const result: QueryResult = await db.query(sql, [id])
    if(!result) {
      response.message = 'Непредвиденная ошибка при удалении сервиса'
      response.statusCode = 500
      throw createError(response)
    }
    if(result.rowCount === 0) {
      response.message = 'Сервис не найден'
      response.statusCode = 400
      throw createError(response)
    }
  }
  catch(err: any) {
    response.message = `Ошибка при удалении сервиса: ${err.message}`
    response.statusCode = 400
  }

  return response
})