import type {H3Event} from 'h3'
import type {ResponseHTTP} from '~/types/ResponseHTTP'
import {db} from '~/server/db'
import {QueryArrayResult, QueryResult} from 'pg'

export default defineEventHandler(async (event: H3Event) => {
  const params = await readBody(event) // Параметры запроса
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
  try{
    const sql: string = `UPDATE base.services SET name = $2 WHERE id = $1 RETURNING *`
    const result: QueryResult = await db.query(sql, Object.values(params))

    if(!result) {
      response.statusCode = 500
      response.message = 'Непредвиденная ошибка при обновлении сервиса'
      throw createError(response)
    }  
  }
  catch(err: any){
    response.statusCode = 400
    response.message = `Ошибка получения списка сервисов в таблице services: ${err.toString()}`
  }
  return response
})