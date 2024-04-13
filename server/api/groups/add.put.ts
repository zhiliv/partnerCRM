import type { H3Event } from 'h3'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import { db } from '~/server/db'
import { QueryResult } from 'pg'

export default defineEventHandler(async (event: H3Event) => {
  const params = await readBody(event) // Параметры запроса
  const response: ResponseHTTP = {
    statusCode: 200,
    message: 'Запись добавлена успешно',
    data: null
  }

  if(!params) {
    response.statusCode = 500
    response.message = 'Оши бка при получении параметров для создания нового Группы'
    throw createError(response)
  }

  const sql: string = `INSERT INTO base.groups(name) VALUES($1) RETURNING *`
  const result: QueryResult = await db.query(sql, Object.values(params))
  
  if(!result) {
    response.statusCode = 500
    response.message = 'Непредвиденная ошибка при создании Группы'
    throw createError(response)
  }
  
  response.statusCode = 200
  response.message = 'Группа создана успешно'
  response.data = result.rows[0]
  return response
})