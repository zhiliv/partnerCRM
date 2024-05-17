import type { H3Event } from 'h3'
import type { QueryArrayResult, QueryResult } from 'pg'
import type { ParamsGetOrganization } from '~/types/Organization'
import { db } from '~/server/db'
import { getFilter, getSort, getLimit } from '~/server/utils/helper'


export default defineEventHandler(async (event: H3Event) => {
  const params: ParamsGetOrganization = getQuery(event) // Получение параметров запроса
  const response = {
    statusCode: 200,
    message: 'Список организаций получен успешно',
    data: 0
  }

  const sql = `
    SELECT
      COUNT(*) as count
    FROM 
      base.organizations
    `



  try {
    const result: QueryArrayResult = await db.query(sql) // Выполнение запроса  
    if(!result) {
      response.statusCode = 400
      response.message = `Непредвиденная ошибка получения списка организаций`
    }

    const rows: any[] = result.rows
    response.data = rows[0].count
  }
  catch(err: any) {
    response.statusCode = 400
    response.message = `Ошибка получения списка организаций в таблице organizations: ${err.toString()}`
  }
  return response
})