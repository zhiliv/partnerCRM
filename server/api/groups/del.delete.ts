import type { H3Event } from 'h3'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import type { Group } from '~/types/Group'
import type { QueryResult } from 'pg'
import { db } from '~/server/db'

export default defineEventHandler(async (event: H3Event) => {
  const response: ResponseHTTP = {
    statusCode: 200,
    message: 'Группа удалена',
    data: null
  }
  const params: Group = await readBody(event) // Параметры запроса
  if(!params || !params.id) {
    response.message = 'Не передан идентификатор Группы'
    response.statusCode = 500
    throw createError(response)
  }

  const id: number = params.id // Получение идентификатора
  const sql: string = `DELETE FROM base.groups WHERE id = $1`
  try {
    const result: QueryResult = await db.query(sql, [id])
    if(!result) {
      response.message = 'Непредвиденная ошибка при удалении Группы'
      response.statusCode = 500
      throw createError(response)
    }
    if(result.rowCount === 0) {
      response.message = 'Группа не найдена'
      response.statusCode = 400
      throw createError(response)
    }
  }
  catch(err: any) {
    response.message = `Ошибка при удалении Группы: ${err.message}`
    response.statusCode = 400
  }

  return response
})