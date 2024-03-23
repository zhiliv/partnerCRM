/** 
** Описание параметров для запросов из таблицы

*/
export interface ParamsQuery {
  limit: string
  offset: string
  order?: string
  table?: string
  where?: string
}