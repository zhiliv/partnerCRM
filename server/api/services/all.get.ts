import type { H3Event } from 'h3'
import type { Service } from '~/types/Service'
import type { QueryArrayResult } from 'pg'
import type {ParamsQuery} from '~/types/ParamsQuery'
import { db } from '~/server/db'
import { getFilter } from '~/server/utils/helper'


export default defineEventHandler(async (event: H3Event) => {
  const params: ParamsQuery = await getQuery(event) // Получение параметров запроса
  const response = {
    statusCode: 200,
    message: 'Список сервисов получен успешно',
    data: <any>[]
  }

  const sql = `
    SELECT
      id,
      name,
      created_date,
      updated_date
    FROM 
      base.services
      ${getFilter(JSON.parse(params.filter))}
      ${Object.keys(JSON.parse(params.sort)).length > 0 ? getSort(params.sort) : ' ORDER BY id DESC '}
    LIMIT ${params.limit} OFFSET ${params.offset}
    `

  try {
    const result: QueryArrayResult = await db.query(sql) // Выполнение запроса  
    if(!result) {
      response.statusCode = 400
      response.message = `Непредвиденная ошибка получения списка сервисов`
    }

    const rows: Service[][] = result.rows
    response.data = rows
  }
  catch(err: any) {
    response.statusCode = 400
    response.message = `Ошибка получения списка сервисов в таблице services: ${err.toString()}`
  }
  return response
})