import type { H3Event } from 'h3'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import type { FieldsCategory } from '~/types/Category'
import { db } from '~/server/db'
import { QueryArrayResult, QueryResult } from 'pg'

export default defineEventHandler(async (event: H3Event) => {
  const params: FieldsCategory = await getQuery(event) // Получение параметров запроса
  
  const response: ResponseHTTP = {
    statusCode: 200,
    message: 'Категория получена успешно',
    data: null
  } // Параметры ответа
  
  if(!params || !params.id){
    response.statusCode = 500
    response.message = 'Не передан идентификатор категорий'
    return response
  }
  
  const sql: string = `
    SELECT 
      id,
      name,
      created_date,
      updated_date
    FROM base.categories 
    WHERE id = $1 
    `
    
    try{
      const result: QueryArrayResult = await db.query(sql, [params.id])
      if(!result) {
        response.statusCode = 500
        response.message = 'Непредвиденная ошибка при получении категорий'
        return response
      }
      
      const rows: Group[][] = result.rows // Получение строк ответа
      response.data = rows[0]
    }
    catch(err: any){
      response.statusCode = 500
      response.message = err.toString()
      return response
    }
  return response
})