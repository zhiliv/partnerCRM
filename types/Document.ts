import { TimeStamp } from './Time'

/** 
* @interface TypeDoc
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