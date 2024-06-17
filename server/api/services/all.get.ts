import type { H3Event } from 'h3'
import type { FieldsService } from '~/types/Service'
import type { QueryArrayResult } from 'pg'
import type { ParamsQuery } from '~/types/ParamsQuery'
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
      serv.id as id,
      serv.name as name,
      serv.created_date as created_date,
      serv.updated_date,
      serv.domain as domain,
      array_agg(CASE
        WHEN l.category_id IS NOT NULL
            THEN json_build_object('id', l.category_id, 'name', c.name)
        ELSE NULL
    END) as categories,
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
      ${getFilter(JSON.parse(params.filter))}
      GROUP BY serv.id, serv.name, serv.created_date , serv.updated_date,  g.id, g.name, serv.domain
      ${Object.keys(JSON.parse(params.sort)).length > 0 ? getSort(params.sort) : ' ORDER BY id DESC '}
      ${getLimit(params.limit, params.offset)}
  
    `

  try {
    const result: QueryArrayResult = await db.query(sql) // Выполнение запроса  
    if(!result) {
      response.statusCode = 400
      response.message = `Непредвиденная ошибка получения списка сервисов`
    }

    const rows: FieldsService[][] = result.rows
    response.data = rows
  }
  catch(err: any) {
    response.statusCode = 400
    response.message = `Ошибка получения списка сервисов в таблице services: ${err.toString()}`
  }
  return response
})