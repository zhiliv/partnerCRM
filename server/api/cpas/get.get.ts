import type { H3Event } from 'h3'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import type { FieldsCPA, CPA } from '~/types/CPA'
import { db } from '~/server/db'
import { QueryArrayResult, QueryResult } from 'pg'

export default defineEventHandler(async (event: H3Event) => {
  const params: FieldsCPA = await getQuery(event) // Получение параметров запроса

  const response: ResponseHTTP = {
    statusCode: 200,
    message: 'Партнерская программа получена успешно',
    data: null
  } // Параметры ответа

  if(!params || !params.id) {
    response.statusCode = 500
    response.message = 'Не передан идентификатор партнерской программы'
    return response
  }

  const sql: string = `
    SELECT 
      id,
      name,
      created_date,
      updated_date,
      site
    FROM base.cpas
    WHERE id = $1 
    `

  try {
    const result: QueryArrayResult = await db.query(sql, [params.id])
    if(!result) {
      response.statusCode = 500
      response.message = 'Непредвиденная ошибка при получении партнесркой программы'
      return response
    }

    const rows: CPA[][] = result.rows // Получение строк ответа
    response.data = rows[0]
  }
  catch(err: any) {
    response.statusCode = 500
    response.message = err.toString()
    return response
  }
  return response
})