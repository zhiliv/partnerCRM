/** 
** Получение количества строк в таблице "prod.organizations" 
*/

import { db } from '~/server/db'
import { getWhereSql } from './../../utils/helper'
import { ParamsQuery } from '~/types/params-query'

export default defineEventHandler(async event => {
  const params: ParamsQuery = getQuery(event) // Получение параметров

  try {
    const query: string = `
    SELECT
      COUNT(*)
    FROM prod.organizations AS org
    ${params.where ? getWhereSql(JSON.parse(params.where)) : ' '}
    LIMIT ${params.limit} OFFSET ${params.offset}`

    const result = await db.query(query) // Выполнить запрос
    if(!result) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Ошибка получения количества записей организаций'
      })
    }

    return result.rows[0] 

  } catch(error: any) {
    throw createError({
      statusCode: 400, // установка статуса ответа
      message: `Ошибка получения количества организаций ${error.message}` // установка текста сообщения
    })
  }
})


