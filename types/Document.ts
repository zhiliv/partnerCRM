import { TimeStamp } from './Time'

/** 
* @interface FieldsDocument
* @member {Number} id - Идентификатор
* @member {String} name - Наименование
* @member {String} created_date - Дата создания
* @member {String} update_date - Дата обновления
*/
export interface FieldsDocument {
  id?: number | null
  name: string | null
  created_date?: TimeStamp | null
  update_date?: TimeStamp | null
}

export interface Document {

  doc: FieldsDocument
}

/** 
** Описание интерфейса параметров запроса для получения списка
* @interface ParamsGetDocument
*/
export interface ParamsGetDocument {
  limit?: number
  offset?: number
  order?: string
  filter: Document
  sort: Document
}