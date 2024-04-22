import type { TimeStamp } from './Time'
import type { Filter, Sort } from './Filter'

export interface FieldsGroup{
  id?: number
  created_date?: TimeStamp
  update_dated?: TimeStamp
  name?: string
}

/**
 * @interface Group
 * @member {Number} id - Идентификатор
 * @member {String} name - Наименование Группы
 * @member {String} created_date - Дата создания в формате timezone
 * @member {String} update_date - Дата обновления записи в формате timezone
 */
export interface Group {
  grps: FieldsGroup
}

/**
 ** Описание интерфейса фильтров
 * @interface FilterGroup
 * @member {Number} id - Идентификатор
 * @member {String} name - Наименование Группы
 * @member {String} created_date - Дата создани
 */
export interface FilterGroup {
  grps: {
    id?: Filter | null
    name?: Filter | null
    created_date?: Filter | null 
  }
}


/**
 ** Описание интерфейса фильтров
 * @interface SortGroup
 * @member {Number} id - Идентификатор
 * @member {String} name - Наименование Группы
 * @member {String} created_date - Дата создани
 */
export interface SortGroup {
  grps: {
    id?: Sort | null
    name?: Sort | null
    created_date?: Sort | null  
  }
}

/** 
** Описание интерфейса параметров запроса для получения списка
* @interface ParamsGetServices
*/
export interface ParamsGetGroups {
  limit?: number
  offset?: number
  order?: string
  filter: Group
  sort: Group
}