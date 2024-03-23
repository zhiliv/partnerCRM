import { H3Event } from 'h3'

/* Получение данных записи по ее идентификатору */
export default defineEventHandler(async (event: H3Event) => {
  const params: any = getQuery(event)

  /* 
  * @interface Options
  * @member {Object} where - Условия отбора
  * @member {Array} order - Условия сортировки
  * @member {Number} offset - Сдвиг записей
  * @member {Number} limit - Количество записей
  */
  interface Options {
    where?: any
  }

  const options: Options = {
    where: {id: params.id},
  }
  
  return getRecord(params.table, options)
})
