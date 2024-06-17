import type { H3Event } from 'h3'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import { db } from '~/server/db'
import { QueryResult } from 'pg'

export default defineEventHandler(async (event: H3Event) => {
  const params = await readBody(event) // Параметры запроса
  console.log("🚀 -> defineEventHandler -> params:", params)
  const response: ResponseHTTP = {
    statusCode: 200,
    message: 'Запись добавлена успешно',
    data: null
  }

  if(!params) {
    response.statusCode = 500
    response.message = 'Ошибка при получении параметров для создания новой организации'
    return response
  }

  const sql: string = `INSERT INTO base.organizations(name, information, images, service_id) VALUES($1, $2, $3, $4) RETURNING *`
  try{
    const result: QueryResult = await db.query(sql, [params.name, JSON.stringify(params.information), JSON.stringify(params.images), params.service_id])

    if(!result) {
      response.statusCode = 500
      response.message = 'Непредвиденная ошибка при создании организации'
      return response
    }

    response.statusCode = 200
    response.message = 'Организация создана успешно'
    response.data = result.rows[0]  
  }
  catch(err: any){
    response.statusCode = 400
    response.message = `Непредвиденная ошибка при создании организации: ${err.toString()}`
    return response
  }
  
  
  return response
})