import type { H3Event } from 'h3'
import type { QueryArrayResult, QueryResult } from 'pg'
import type { ParamsGetPeriod } from '~/types/Period'
import { db } from '~/server/db'
import { getFilter, getSort, getLimit } from '~/server/utils/helper'


export default defineEventHandler(async (event: H3Event) => {
  const params: ParamsGetPeriod = getQuery(event) // Получение параметров запроса
  const response = {
    statusCode: 200,
    message: 'Список периодов получен успешно',
    data: 0
  }

  const sql = `
    SELECT
      COUNT(*) as count
    FROM 
      base.periods
    `



  try {
    const result: QueryArrayResult = await db.query(sql) // Выполнение запроса  
    if(!result) {
      response.statusCode = 400
      response.message = `Непредвиденная ошибка получения списка периодов`
    }

    const rows: any[] = result.rows
    response.data = rows[0].count
  }
  catch(err: any) {
    response.statusCode = 400
    response.message = `Ошибка получения списка периодов в таблице periods: ${err.toString()}`
  }
  return response
})