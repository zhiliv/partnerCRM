import type { H3Event } from 'h3'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import { db } from '~/server/db'
import { QueryResult } from 'pg'

export default defineEventHandler(async (event: H3Event) => {
  const params = await readBody(event) // Параметры запроса
  const response: ResponseHTTP = {
    statusCode: 200,
    message: 'Запись добавлена успешно',
    data: null
  }

  if(!params) {
    response.statusCode = 500
    response.message = 'Ошибка при получении параметров для создания нового периода'
    return response
  }
  
  const obj = {
    name: params.name,
    padez: params.padez,
    mnozh: params.mnozh
  }

  const sql: string = `INSERT INTO base.periods(name, padez, mnozh) VALUES($1, $2, $3) RETURNING *`
  try{
    const result: QueryResult = await db.query(sql, Object.values(obj))

    if(!result) {
      response.statusCode = 500
      response.message = 'Непредвиденная ошибка при создании периода'
      return response
    }

    response.statusCode = 200
    response.message = 'Период создан успешно'
    response.data = result.rows[0]  
  }catch(err:any){
    response.statusCode = 400
    response.message = `Ошибка при создании периода:${err.toString()}`
  }
  
  return response
})