import { H3Event } from 'h3'
import { db } from '~/server/db'


interface Organization {
  id: number
}

/* Получение данных записи по ее идентификатору */
export default defineEventHandler(async (event: H3Event) => {
  console.log('🚀 -> defineEventHandler -> event:', event)
  const params: Organization = getQuery(event) // получение параметров
  if(!params) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка получения параметров при получении данных о организации'
    })
  }

  if(!params.id) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Не передан идентификатор организации для получения данных'
    })
  }


  const sql = `
  SELECT
    org.id, -- Идентификатор
    org.name as name, -- Наименование
    CASE WHEN information IS NOT  NULL
      THEN 
        to_jsonb(information)
      ELSE
        NULL
      END AS information,
    CASE WHEN images IS NOT NULL
      THEN 
        -- array_to_json(array[to_json(images)])
        to_jsonb(images)
      ELSE  
        NULL
      END AS Images
  FROM 
    prod.organizations AS org
  WHERE org.id=$1
  ORDER BY name  LIMIT 1
`

  const result = await db.query(sql, [params.id])
  console.log('🚀 -> defineEventHandler -> result:', result)
  if(!result) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка получения данных о организации'
    })
  }

  return result.rows[0]
})
