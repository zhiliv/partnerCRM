import type { H3Event } from 'h3'
import type { QueryArrayResult, QueryResult } from 'pg'
import type { ParamsGetService } from '~/types/Service'
import { db } from '~/server/db'
import { getFilter, getSort, getLimit } from '~/server/utils/helper'


export default defineEventHandler(async (event: H3Event) => {
  const params: ParamsGetService = getQuery(event) // Получение параметров запроса
  const response = {
    statusCode: 200,
    message: 'Список сервисов получен успешно',
    data: 0
  }

  const sql = `
    SELECT
      COUNT(*) as count
    FROM 
      base.services
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