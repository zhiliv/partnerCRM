import type { H3Event } from 'h3'
import type { FieldsCategory } from '~/types/Category'
import type { QueryArrayResult } from 'pg'
import type {ParamsQuery} from '~/types/ParamsQuery'
import { db } from '~/server/db'
import { getFilter } from '~/server/utils/helper'


export default defineEventHandler(async (event: H3Event) => {
  const params: ParamsQuery = await getQuery(event) // Получение параметров запроса
  const response = {
    statusCode: 200,
    message: 'Список категорий получен успешно',
    data: <any>[]
  }

  const sql = `
    SELECT
      cat.id,
      cat.name,
      cat.created_date,
      cat.updated_date
    FROM 
      base.categories as cat
      ${getFilter(JSON.parse(params.filter))}
      ${Object.keys(JSON.parse(params.sort)).length > 0 ? getSort(params.sort) : ' ORDER BY id DESC '}
    ${getLimit(params.limit, params.offset)}
    `

  try {
    const result: QueryArrayResult = await db.query(sql) // Выполнение запроса  
    if(!result) {
      response.statusCode = 400
      response.message = `Непредвиденная ошибка получения списка категорий`
    }

    const rows: FieldsCategory[][] = result.rows
    response.data = rows
  }
  catch(err: any) {
    response.statusCode = 400
    response.message = `Ошибка получения списка категорий в таблице categories: ${err.toString()}`
  }
  return response
})