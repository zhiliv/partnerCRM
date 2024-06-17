import type { H3Event } from 'h3'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import type { FieldsOrganization } from '~/types/Organization'
import { db } from '~/server/db'
import { QueryArrayResult, QueryResult } from 'pg'

export default defineEventHandler(async (event: H3Event) => {
  const params: FieldsOrganization = await getQuery(event) // Получение параметров запроса
  
  const response: ResponseHTTP = {
    statusCode: 200,
    message: 'Организация получена успешно',
    data: null
  } // Параметры ответа
  
  if(!params || !params.id){
    response.statusCode = 500
    response.message = 'Не передан идентификатор организации'
    return response
  }
  
  const sql: string = `
    SELECT 
      id,
      name,
      service_id,
      information,
      images,
      created_date,
      updated_date
    FROM base.organizations 
    WHERE id = $1 
    `
    
    try{
      const result: QueryArrayResult = await db.query(sql, [params.id])
      if(!result) {
        response.statusCode = 500
        response.message = 'Непредвиденная ошибка при получении организации'
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