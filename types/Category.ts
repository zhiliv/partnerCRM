import type { TimeStamp } from './Time'
import type {  Sort } from './Filter'

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
 ** Описание интерфейса фильтров
 * @interface FilterCategory
 * @member {Number} id - Идентификатор
 * @member {String} name - Наименование Группы
 * @member {String} created_date - Дата создани
 */
export interface FilterCategory {
  cat: FieldsCategory
}


/**
 ** Описание интерфейса фильтров
 * @interface SortCategory
 * @member {Number} id - Идентификатор
 * @member {String} name - Наименование Группы
 * @member {String} created_date - Дата создани
 */
export interface SortCategory {
  id?: Sort | null
  name?: Sort | null
  created_date?: Sort | null
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