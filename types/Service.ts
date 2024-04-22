import type { TimeStamp } from './Time'
import type { Filter, Sort } from './Filter'
import type { Category, FieldsCategory } from './Category'

/**
 * @interface Service
 * @member {Number} id - Идентификатор
 * @member {String} name - Наименование Группы
 * @member {String} created_date - Дата создания в формате timezone
 * @member {String} update_date - Дата обновления записи в формате timezone
 * @member {Number} id_group - Идентификатор группы
 * @member {Number[]} add_id_category - Идентификатор добавляемых категорий
 * @member {Number[]} del_id_category - Идентификатор удаляемых категорий
 */
export interface FieldsService{
  id?: number | null
  created_date?: TimeStamp | null
  update_dated?: TimeStamp | null
  name?: string | null
  id_group?: number | null
  id_category?: number[]
  add_id_category?: number[]
  del_id_category?: number[]
  categories?: FieldsCategory[] | any
  add_categories_id?: number[]
  del_categories_id?: number[]
  categories_text?: string | null
  group_text?: string | null
}

export interface Service {
  serv: FieldsService
}


/**
 ** Описание интерфейса фильтров
 * @interface FilterService
 * @member {Number} id - Идентификатор
 * @member {String} name - Наименование Группы
 * @member {String} created_date - Дата создани
 */
export interface FilterService {
  serv: FieldsService
}


/**
 ** Описание интерфейса фильтров
 * @interface SortService
 * @member {Number} id - Идентификатор
 * @member {String} name - Наименование Группы
 * @member {String} created_date - Дата создани
 */
export interface SortService {
  id?: Sort | null
  name?: Sort | null
  created_date?: Sort | null
  id_group?: number
  id_category?: number
  
}

/** 
** Описание интерфейса параметров запроса для получения списка
* @interface ParamsGetCategory
*/
export interface ParamsGetService {
  limit?: number
  offset?: number
  order?: string
  filter: Service
  sort: Service
}

