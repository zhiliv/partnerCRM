import type { TimeStamp } from './Time'
import type { Sort } from './Filter'

/** 
** Описание интерфейса для полей категории
* @interface FieldsCategory
* @member {Number} id - Идентификатор
* @member {String} name - Наименование Группы
* @member {String} created_date - Дата создания в формате timezone
* @member {String} update_date - Дата обновления записи в формате timezone
*/
export interface FieldsCategory {
  id?: number | null
  created_date?: TimeStamp | null
  update_dated?: TimeStamp | null
  name?: string | null
}

/**
 * @interface Category
 * @member {Number} id - Идентификатор
 * @member {String} name - Наименование Группы
 * @member {String} created_date - Дата создания в формате timezone
 * @member {String} update_date - Дата обновления записи в формате timezone
 */
export interface Category {
  cat: FieldsCategory
}

/** 
** Описание интерфейса параметров запроса для получения списка
* @interface ParamsGetCategory
*/
export interface ParamsGetCategory {
  limit?: number
  offset?: number
  order?: string
  filter: Category
  sort: Category
}