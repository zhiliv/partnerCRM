import type { TimeStamp } from './Time'

/** 
** Описание интерфейса для дополнительных полей
* @interface FieldsField
* @member {Number} id - Идентификатор
* @member {String} name - Наименование Группы
* @member {String} created_date - Дата создания в формате timezone
* @member {String} update_date - Дата обновления записи в формате timezone
* @member {String} table - Таблица
* @member {Object} values - Значение полей
*/
export interface FieldsField {
  id?: number | null
  created_date?: TimeStamp | null
  update_dated?: TimeStamp | null
  table?: string | null
  values: {
    name?: string | null 
    label?: string | null
    description?: string | null
    type?: string
  }
}

/**
 * @interface Field
 * @member {Object} fld - Поле
 */
export interface Field {
  fld: FieldsField
}

/** 
** Описание интерфейса параметров запроса для получения списка
* @interface ParamsGetFields
*/
export interface ParamsGetFields {
  limit?: number
  offset?: number
  order?: string
  filter: Field
  sort: Field
}

/* 
** Описание интерфейса для дополнительных полей для редактирования \ создания
* @interface EditField
*/
export interface EditField {
  id?: number | null
  name?: string | null 
  label?: string | null
  description?: string | null
  table?: string | null
  type?: string | null
  
}