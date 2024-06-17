import type { H3Event } from 'h3'
import type { FieldsCategory } from '~/types/Category'
import type { QueryArrayResult } from 'pg'
import type {ParamsQuery} from '~/types/ParamsQuery'
import { db } from '~/server/db'

interface Params extends ParamsQuery {
  table: string
}

export default defineEventHandler(async (event: H3Event) => {
  const params: Params = await getQuery(event) // Получение параметров запроса
  console.log("🚀 -> defineEventHandler -> params:", params)
  
  const response = {
    statusCode: 200,
    message: 'Список дополнительных получен успешно',
    data: <any>[]
  }
  
  if(!params || !params.table) {
    response.statusCode = 400
    response.message = 'Не передана таблица'
    return response
  }

  const sql = `
    SELECT
      fld.id,
      fld.table,
      fld.values,
      fld.created_date,
      fld.updated_date,
      fld.values -> 'name' as name,
      fld.values -> 'label' as label,
      fld.values -> 'description' as description,
      fld.values -> 'type' as type
    FROM 
      service.fields as fld
      WHERE fld.table = $1
    `

  try {
    const result: QueryArrayResult = await db.query(sql, [params.table]) // Выполнение запроса  
    if(!result) {
      response.statusCode = 400
      response.message = `Непредвиденная ошибка получения списка дополнительных полей`
    }

    const rows: FieldsCategory[][] = result.rows
    response.data = rows
  }
  catch(err: any) {
    response.statusCode = 400
    response.message = `Ошибка получения списка полей в таблице fields: ${err.toString()}`
  }
  return response
})