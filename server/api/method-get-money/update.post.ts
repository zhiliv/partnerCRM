import type {H3Event} from 'h3'
import type {ResponseHTTP} from '~/types/ResponseHTTP'
import {db} from '~/server/db'
import {QueryArrayResult, QueryResult} from 'pg'

export default defineEventHandler(async (event: H3Event) => {
  const params = await readBody(event) // Параметры запроса
  const response: ResponseHTTP = {
    statusCode: 200,
    message: 'Запись обновлена успешно',
    data: null
  }

  if(!params) {
    response.statusCode = 500
    response.message = 'Ошибка при получении параметров для обновления способа получения денег'
    return response
  }
  try{
    const sql: string = `UPDATE base.categories SET name = $2 WHERE id = $1 RETURNING *`
    const result: QueryResult = await db.query(sql, Object.values(params))

    if(!result) {
      response.statusCode = 500
      response.message = 'Непредвиденная ошибка при обновлении способа получения денег'
      return response
    }  
  }
  catch(err: any){
    response.statusCode = 400
    response.message = `Ошибка получения списка способов получения денег в таблице method_get_money: ${err.toString()}`
  }
  return response
})