import { db } from '~/server/db'

export const getWhereOffer = (params: any) => {
  const getTerm = (data: string) => {
    let condition
    switch(data) {
      case 'eq':
        condition = ' = '
        break
      case 'gt':
        condition = ' > '
        break
      case 'lt':
        condition = ' < '
        break
      case 'iLike':
        condition = ' iLIKE '
        break
      default:
        condition = ' = '
    }
    return condition
  }

  const getKey = (key: string) => {
    let result
    switch(key) {
      case 'id':
        result = 'offers.id'
        break;
      case 'name':
        result = 'offers.name'
        break;
      case 'cpa_name':
        result = 'cpa.name'
        break;
      case 'status':
        result = 'offers.status'
        break;
    }
    return result
  }

  let where = `WHERE `
  let index = 0
  for(let param in params) {
    where += ` ${index !== 0 ? ' AND ' : ' '}     ${getKey(param)} ${getTerm(params[param].type)} ${params[param].value}`
  }
  return where
}

export default defineEventHandler(async event => {
  const params: any = getQuery(event)
  const order = JSON.parse(params.order)

  try {
    const query: string = `
    SELECT
      offers.id, -- Идентификатор
      offers.name AS name, -- Наименование
      cpa.name AS cpa_name, -- Наименование партнерской программы
      org.name AS org_name, -- Наименование организации
      offers.status AS status -- Статус оффера
    FROM prod.offers AS offers
    LEFT JOIN guide.cpa cpa on cpa.id = offers.id_cpa
    LEFT JOIN prod.organizations org ON org.id = offers.id_organization
    ${params.where ? getWhereOffer(JSON.parse(params.where)) : ' '}
    ORDER BY ${order[0][0]} ${order[0][1]}
    LIMIT ${params.limit} OFFSET ${params.offset}`
    const result = await sequelize.query(query)
    return result[0]

  } catch(error: any) {
    let message: string = '' // текст сообщения
    message = error && error.errors && error.errors.length ? error.errors.map((el: any) => el.message).join('\n') : '' // получение текста ошибки
    if(error.original && error.original.hint) message = error.original.message + '; ' + error.original.hint
    throw createError({
      statusCode: 400, // установка статуса ответа
      message, // установка текста сообщения
    })
  }
})