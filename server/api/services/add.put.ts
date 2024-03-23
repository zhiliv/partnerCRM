import { H3Event } from 'h3'
import { db } from '~/server/db'
import { QueryResult } from 'pg'
import { SchemaDB } from '~/types/SchemaDB'
import servicesSchema from '~/schemas/bases.services.schema'

export default defineEventHandler(async (event: H3Event) => {
  const params = await readBody(event) // Параметры запроса
  const response = {
    statusCode: 200,
    message: 'Запись добавлена успешно',
    data: null
  }

  if(!params) {
    response.statusCode = 500
    response.message = 'Оши бка при получении параметров для создания нового сервиса'
    throw createError(response)
  }

  const sql: string = `INSERT INTO bases.services(name) VALUES($1) RETURNING *`
  const result: QueryResult = await db.query(sql, Object.values(params))
  
  if(!result) {
    response.statusCode = 500
    response.message = 'Непредвиденная ошибка при создании сервиса'
    throw createError(response)
  }
  
  response.statusCode = 200
  response.message = 'Сервис создан успешно'
  response.data = result.rows[0]
  return response
})