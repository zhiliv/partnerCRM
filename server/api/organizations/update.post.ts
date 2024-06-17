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
    response.message = 'Ошибка при получении параметров для обновления организации'
    return response
  }
  
  const item = {
    id: params.id,
    name: params.name,
    service_id: params.service_id,
    information: JSON.stringify(params.information),
    images: JSON.stringify(params.images)
  }
  try {
    const sql: string = `UPDATE base.organizations SET name = $2, service_id = $3, information = $4, images = $5 WHERE id = $1 RETURNING *`
    const result: QueryResult = await db.query(sql, [item.id, item.name, item.service_id, item.information, item.images])

    if(!result) {
      response.statusCode = 500
      response.message = 'Непредвиденная ошибка при обновлении организации'
      return response
    }
  }
  catch(err: any) {
    response.statusCode = 400
    response.message = `Ошибка обновлении организации: ${err.toString()}`
  }
  return response
})