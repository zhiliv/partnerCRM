import type { TimeStamp } from './Time'
import type { Sort } from './Filter'

/** 
** Описание интерфейса для дополнительных полей
* @interface FieldsField
* @member {Number} id - Идентификатор
* @member {String} name - Наименование Группы
* @member {String} created_date - Дата создания в формате timezone
* @member {String} update_date - Дата обновления записи в формате timezone
* @member {String} table - Таблица
* @member {Object} values - 
*/
export interface FieldsField {
  id?: number | null
  created_date?: TimeStamp | null
  update_dated?: TimeStamp | null
  table?: string | null
  values?: {
    name: string | null
    label: string | null
    description: string | null
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