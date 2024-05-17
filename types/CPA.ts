import { TimeStamp } from './Time'

/** 
* @interface FieldsCPA
* @member {Number} id - Идентификатор
* @member {String} name - Наименование
* @member {String} created_date - Дата создания
* @member {String} update_date - Дата обновления
*/
export interface FieldsCPA {
  id?: number | null
  name: string | null
  created_date?: TimeStamp | null
  update_date?: TimeStamp | null
  site?: URL | null
}

export interface CPA {

  cpa: FieldsCPA
}

/** 
** Описание интерфейса параметров запроса для получения списка
* @interface ParamsGetCategory
*/
export interface ParamsGetCPA {
  limit?: number
  offset?: number
  order?: string
  filter: CPA
  sort: CPA
}