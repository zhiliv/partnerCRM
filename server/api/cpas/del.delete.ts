import type { H3Event } from 'h3'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import type { FieldsCPA } from '~/types/CPA'
import type { QueryResult } from 'pg'
import { db } from '~/server/db'

export default defineEventHandler(async (event: H3Event) => {
  const response: ResponseHTTP = {
    statusCode: 200,
    message: 'Партнерская программа удалена',
    data: null
  }
  const params: FieldsCPA = await readBody(event) // Параметры запроса
  if(!params || !params.id) {
    response.message = 'Не передан идентификатор партнерской программы'
    response.statusCode = 500
    return response
  }

  const id: number = params.id // Получение идентификатора
  const sql: string = `DELETE FROM base.cpas  WHERE id = $1`
  try {
    const result: QueryResult = await db.query(sql, [id])
    if(!result) {
      response.message = 'Непредвиденная ошибка при удалении партнерской программы'
      response.statusCode = 500
      return response
    }
    if(result.rowCount === 0) {
      response.message = 'Партнерская программа не найдена'
      response.statusCode = 400
      return response
    }
  }
  catch(err: any) {
    response.message = `Ошибка при удалении партнерской программы: ${err.message}`
    response.statusCode = 400
  }

  return response
})