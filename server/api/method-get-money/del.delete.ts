import type { H3Event } from 'h3'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import type { FieldsMethodGetMoney } from '~/types/Method_get_money'
import type { QueryResult } from 'pg'
import { db } from '~/server/db'

export default defineEventHandler(async (event: H3Event) => {
  const response: ResponseHTTP = {
    statusCode: 200,
    message: 'Способ получения денег удален',
    data: null
  }
  const params: FieldsMethodGetMoney = await readBody(event) // Параметры запроса
  if(!params || !params.id) {
    response.message = 'Не передан идентификатор Группы'
    response.statusCode = 500
    return response
  }

  const id: number = params.id // Получение идентификатора
  const sql: string = `DELETE FROM "references".method_get_money  WHERE id = $1`
  try {
    const result: QueryResult = await db.query(sql, [id])
    if(!result) {
      response.message = 'Непредвиденная ошибка при удалении способа получения денег'
      response.statusCode = 500
      return response
    }
    if(result.rowCount === 0) {
      response.message = 'Способ получения денег не найдена'
      response.statusCode = 400
      return response
    }
  }
  catch(err: any) {
    response.message = `Ошибка при удалении способа получения денег: ${err.message}`
    response.statusCode = 400
  }

  return response
})