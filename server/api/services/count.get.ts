import { H3Event } from 'h3'
import { QueryArrayResult, QueryResult } from 'pg'
import { db } from '~/server/db'
import { SchemaDB } from '~/types/SchemaDB'
import servicesSchema from '~/schemas/bases.services.schema'


export default defineEventHandler(async (event: H3Event) => {
  const params: object = getQuery(event) // Получение параметров запроса
  const columns: string[] | null = getColumnFromSchema(<SchemaDB>servicesSchema) // Получение колонок таблицы 
  const response = {
    statusCode: 200,
    message: 'Список сервисов получен успешно',
    data: 0
  }

  const sql = `
    SELECT
      COUNT(*) as count
    FROM 
      ${servicesSchema.fullPath}
    `


  try {
    const result: QueryArrayResult = await db.query(sql) // Выполнение запроса  
    if(!result) {
      response.statusCode = 400
      response.message = `Непредвиденная ошибка получения списка сервисов`
    }

    const rows: any[] = result.rows
    response.data = rows[0].count
  }
  catch(err: any) {
    response.statusCode = 400
    response.message = `Ошибка получения списка сервисов в таблице services: ${err.toString()}`
  }
  return response
})