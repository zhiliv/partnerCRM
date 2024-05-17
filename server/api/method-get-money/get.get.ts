import type { H3Event } from 'h3'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import type { FieldsMethodGetMoney, MethodGetMoney } from '~/types/Method_get_money'
import { db } from '~/server/db'
import { QueryArrayResult, QueryResult } from 'pg'

export default defineEventHandler(async (event: H3Event) => {
  const params: FieldsMethodGetMoney = await getQuery(event) // Получение параметров запроса
  
  const response: ResponseHTTP = {
    statusCode: 200,
    message: 'Способ получения денег получена успешно',
    data: null
  } // Параметры ответа
  
  if(!params || !params.id){
    response.statusCode = 500
    response.message = 'Не передан идентификатор Способа получения денег'
    return response
  }
  
  const sql: string = `
    SELECT 
      id,
      name,
      created_date,
      updated_date
    FROM base.method_get_money
    WHERE id = $1 
    `
    
    try{
      const result: QueryArrayResult = await db.query(sql, [params.id])
      if(!result) {
        response.statusCode = 500
        response.message = 'Непредвиденная ошибка при получении способа получения денег'
        return response
      }
      
      const rows: MethodGetMoney[][] = result.rows // Получение строк ответа
      response.data = rows[0]
    }
    catch(err: any){
      response.statusCode = 500
      response.message = err.toString()
      return response
    }
  return response
})