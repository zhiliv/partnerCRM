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
    response.message = 'Ошибка при получении параметров для обновления документа'
    return response
  }
  
  const obj = {
    id: params.id,
    name: params.name
  }
  
  try{
    const sql: string = `UPDATE base.documents SET name = $2 WHERE id = $1 RETURNING *`
    const result: QueryResult = await db.query(sql, Object.values(obj))

    if(!result) {
      response.statusCode = 500
      response.message = 'Непредвиденная ошибка при обновлении документа'
      return response
    }  
  }
  catch(err: any){
    response.statusCode = 400
    response.message = `Ошибка обновлении документа: ${err.toString()}`
  }
  return response
})