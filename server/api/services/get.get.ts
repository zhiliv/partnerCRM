import type { H3Event } from 'h3'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import type { FieldsService } from '~/types/Service'
import { db } from '~/server/db'
import { QueryArrayResult, QueryResult } from 'pg'

export default defineEventHandler(async (event: H3Event) => {
  const params: FieldsService = await getQuery(event) // Получение параметров запроса

  const response: ResponseHTTP = {
    statusCode: 200,
    message: 'Сервис получен успешно',
    data: null
  } // Параметры ответа

  if(!params || !params.id) {
    response.statusCode = 500
    response.message = 'Не передан идентификатор сервиса'
    return response
  }

  const sql: string = `
    SELECT
      serv.id as id,
      serv.name as name,
      serv.created_date as created_date,
      serv.updated_date,
      serv.domain as domain,
      array_agg(
            json_build_object('id', l.category_id, 'name', c.name)
       ) as categories,
    array_to_string(array_agg(CASE
        WHEN l.category_id IS NOT NULL
            THEN  c.name
        ELSE NULL
    END), ',') as categories_text,
    g.name as group_text,
    g.id as id_group
  FROM
      base.services serv
      LEFT JOIN base.link_service_category l ON l.service_id = serv.id
      LEFT join base.categories c ON l.category_id = c.id
      LEFT join base.groups g ON g.id = serv.id_group
    WHERE serv.id = $1 
    GROUP BY serv.id, serv.name, serv.created_date , serv.updated_date,  g.id, g.name, serv.domain
    `

  try {
    const result: QueryArrayResult = await db.query(sql, [params.id])
    if(!result) {
      response.statusCode = 500
      response.message = 'Непредвиденная ошибка при получении сервиса'
      return response
    }

    const rows: FieldsService[][] = result.rows // Получение строк ответа
    response.data = rows[0]
  }
  catch(err: any) {
    response.statusCode = 500
    response.message = err.toString()
    return response
  }
  return response
})