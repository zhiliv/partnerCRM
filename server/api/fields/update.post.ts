import type { H3Event } from 'h3'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import { db } from '~/server/db'
import { QueryArrayResult, QueryResult } from 'pg'

export default defineEventHandler(async (event: H3Event) => {
  const params = await readBody(event) // Параметры запроса
  const response: ResponseHTTP = {
    statusCode: 200,
    message: 'Запись обновлена успешно',
    data: null
  }

  if(!params) {
    response.statusCode = 500
    response.message = 'Ошибка при получении параметров для обновления дополнительных полей'
    return response
  }
  const values: {name: null, label: null, description: null} = {
    name: params.name,
    label: params.label,
    description: params.description
  } // Значения для обновления
  
  try {
    const sql: string = `UPDATE service.fields SET "table" = $1, values = $3 WHERE id = $2 RETURNING *`
    const result: QueryResult = await db.query(sql, [params.table, params.id, values])

    if(!result) {
      response.statusCode = 500
      response.message = 'Непредвиденная ошибка при обновлении дополнительного поля'
      return response
    }
  }
  catch(err: any) {
    response.statusCode = 400
    response.message = `Ошибка обновлении поля: ${err.toString()}`
  }
  return response
})