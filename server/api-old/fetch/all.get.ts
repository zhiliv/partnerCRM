import { H3Event } from 'h3'
import { getList, getWhere } from '~/server/utils/helper.js'

export default defineEventHandler(async (event: H3Event) => {
  const params: any = getQuery(event)

  type Order = {
    field: string;
    value: 'ASC' | 'DESC';
  }

  /* 
  * @interface Options
  * @member {Object} where - Условия отбора
  * @member {Array} order - Условия сортировки
  * @member {Number} offset - Сдвиг записей
  * @member {Number} limit - Количество записей
  */
  interface Options {
    where?: any
    order?: Order[]
    offset: number
    limit: number
  }

  const options: Options = {
    where: params.where ? getWhere(params.table, params.where) : {},
    order: params.order,
    offset: params.offset,
    limit: params.limit
  }
  
  return getList(params.table, options)
})
