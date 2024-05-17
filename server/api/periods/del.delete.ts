import type { H3Event } from 'h3'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import type { FieldsPeriod } from '~/types/Period'
import type { QueryResult } from 'pg'
import { db } from '~/server/db'

export default defineEventHandler(async (event: H3Event) => {
  const response: ResponseHTTP = {
    statusCode: 200,
    message: 'Период удален',
    data: null
  }
  const params: FieldsPeriod = await readBody(event) // Параметры запроса
  if(!params || !params.id) {
    response.message = 'Не передан идентификатор периода'
    response.statusCode = 500
    return response
  }

  const id: number = params.id // Получение идентификатора
  const sql: string = `DELETE FROM base.periods  WHERE id = $1`
  try {
    const result: QueryResult = await db.query(sql, [id])
    if(!result) {
      response.message = 'Непредвиденная ошибка при удалении периода'
      response.statusCode = 500
      return response
    }
    if(result.rowCount === 0) {
      response.message = 'Период не найдена'
      response.statusCode = 400
      return response
    }
  }
  catch(err: any) {
    response.message = `Ошибка при удалении периода: ${err.message}`
    response.statusCode = 400
  }

  return response
})