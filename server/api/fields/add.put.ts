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
    response.message = 'Ошибка при получении параметров для создания нового поля'
    return response
  }
  
  
  const obj = {
    name: params.name,
    label: params.label,
    description: params.description,
    type: params.type
  }

  const sql: string = `INSERT INTO service.fields("table", values) VALUES($1, $2) RETURNING *`
  try{
    const result: QueryResult = await db.query(sql, [params.table, obj])

    if(!result) {
      response.statusCode = 500
      response.message = 'Непредвиденная ошибка при создании дополнительного поля'
      return response
    }

    response.statusCode = 200
    response.message = 'Поле создано успешно'
    response.data = result.rows[0]  
  }
  catch(err: any){
    response.statusCode = 400
    response.message = `Непредвиденная ошибка при создании поля: ${err.toString()}`
    return response
  }
  
  
  return response
})