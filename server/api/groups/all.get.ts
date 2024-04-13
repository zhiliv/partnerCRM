import type { H3Event } from 'h3'
import type { Group } from '~/types/Group'
import type { QueryArrayResult } from 'pg'
import type {ParamsQuery} from '~/types/ParamsQuery'
import { db } from '~/server/db'
import { getFilter } from '~/server/utils/helper'


export default defineEventHandler(async (event: H3Event) => {
  const params: ParamsQuery = await getQuery(event) // Получение параметров запроса
  const response = {
    statusCode: 200,
    message: 'Список групп получен успешно',
    data: <any>[]
  }

  const sql = `
    SELECT
      id,
      name,
      created_date,
      updated_date
    FROM 
      base.groups
      ${getFilter(JSON.parse(params.filter))}
      ${Object.keys(JSON.parse(params.sort)).length > 0 ? getSort(params.sort) : ' ORDER BY id DESC '}
    LIMIT ${params.limit} OFFSET ${params.offset}
    `

  try {
    const result: QueryArrayResult = await db.query(sql) // Выполнение запроса  
    if(!result) {
      response.statusCode = 400
      response.message = `Непредвиденная ошибка получения списка групп`
    }

    const rows: Group[][] = result.rows
    response.data = rows
  }
  catch(err: any) {
    response.statusCode = 400
    response.message = `Ошибка получения списка групп в таблице groups: ${err.toString()}`
  }
  return response
})