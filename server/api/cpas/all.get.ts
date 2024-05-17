import type { H3Event } from 'h3'
import type { FieldsCPA } from '~/types/CPA'
import type { QueryArrayResult } from 'pg'
import type {ParamsQuery} from '~/types/ParamsQuery'
import { db } from '~/server/db'
import { getFilter } from '~/server/utils/helper'


export default defineEventHandler(async (event: H3Event) => {
  const params: ParamsQuery = await getQuery(event) // Получение параметров запроса
  const response = {
    statusCode: 200,
    message: 'Список партнерских программ получен успешно',
    data: <any>[]
  }

  const sql = `
    SELECT
      cpa.id,
      cpa.name,
      cpa.created_date,
      cpa.updated_date,
      site
    FROM 
      base.cpas as cpa
      ${getFilter(JSON.parse(params.filter))}
      ${Object.keys(JSON.parse(params.sort)).length > 0 ? getSort(params.sort) : ' ORDER BY id DESC '}
    ${getLimit(params.limit, params.offset)}
    `

  try {
    const result: QueryArrayResult = await db.query(sql) // Выполнение запроса  
    if(!result) {
      response.statusCode = 400
      response.message = `Непредвиденная ошибка получения списка партнерских программ`
    }

    const rows: FieldsCPA[][] = result.rows
    response.data = rows
  }
  catch(err: any) {
    response.statusCode = 400
    response.message = `Ошибка получения списка партнерских программ в таблице cpas: ${err.toString()}`
  }
  return response
})