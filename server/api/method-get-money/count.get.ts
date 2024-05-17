import type { H3Event } from 'h3'
import type { QueryArrayResult, QueryResult } from 'pg'
import type { ParamsGetMethodGetMoney } from '~/types/Method_get_money'
import { db } from '~/server/db'
import { getFilter, getSort, getLimit } from '~/server/utils/helper'


export default defineEventHandler(async (event: H3Event) => {
  const params: ParamsGetMethodGetMoney = getQuery(event) // Получение параметров запроса
  const response = {
    statusCode: 200,
    message: 'Список способов получения денег получен успешно',
    data: 0
  }

  const sql = `
    SELECT
      COUNT(*) as count
    FROM 
      base.method_get_money
    `



  try {
    const result: QueryArrayResult = await db.query(sql) // Выполнение запроса  
    if(!result) {
      response.statusCode = 400
      response.message = `Непредвиденная ошибка получения списка способов получения денег`
    }

    const rows: any[] = result.rows
    response.data = rows[0].count
  }
  catch(err: any) {
    response.statusCode = 400
    response.message = `Ошибка получения списка способов получения денег в таблице method_get_money: ${err.toString()}`
  }
  return response
})