import type { H3Event } from 'h3'
import type { FieldsMethodGetMoney } from '~/types/Method_get_money'
import type { QueryArrayResult } from 'pg'
import type {ParamsQuery} from '~/types/ParamsQuery'
import { db } from '~/server/db'
import { getFilter } from '~/server/utils/helper'


export default defineEventHandler(async (event: H3Event) => {
  const params: ParamsQuery = await getQuery(event) // Получение параметров запроса
  const response = {
    statusCode: 200,
    message: 'Список способов получения денег получен успешно',
    data: <any>[]
  }

  const sql = `
    SELECT
      mgm.id,
      mgm.name,
      mgm.created_date,
      mgm.updated_date
    FROM 
      base.method_get_money as mgm
      ${getFilter(JSON.parse(params.filter))}
      ${Object.keys(JSON.parse(params.sort)).length > 0 ? getSort(params.sort) : ' ORDER BY id DESC '}
    ${getLimit(params.limit, params.offset)}
    `

  try {
    const result: QueryArrayResult = await db.query(sql) // Выполнение запроса  
    if(!result) {
      response.statusCode = 400
      response.message = `Непредвиденная ошибка получения списка способов получения денег`
    }

    const rows: FieldsMethodGetMoney[][] = result.rows
    response.data = rows
  }
  catch(err: any) {
    response.statusCode = 400
    response.message = `Ошибка получения списка способов получения денег в таблице method_get_money: ${err.toString()}`
  }
  return response
})