import { TimeStamp } from './Time'

/** 
* @interface MethodGetMoney
* @member {Number} id - Идентификатор
* @member {String} name - Наименование
* @member {String} created_date - Дата создания
* @member {String} update_date - Дата обновления
*/
export interface FieldsMethodGetMoney {
  id?: number | null
  name: string | null
  created_date?: TimeStamp | null
  update_date?: TimeStamp | null
}

export interface MethodGetMoney{
  mgm: FieldsMethodGetMoney
}

/** 
** Описание интерфейса параметров запроса для получения списка
* @interface ParamsGetMethodGetMoney
*/
export interface ParamsGetMethodGetMoney {
  limit?: number
  offset?: number
  order?: string
  filter: MethodGetMoney
  sort: MethodGetMoney
}