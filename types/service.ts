import type { TimeStamp } from './Time'
import type { Filter, Sort } from './Filter'

/**
 * @interface Service
 * @member {Number} id - Идентификатор
 * @member {String} name - Наименование сервиса
 * @member {String} created_date - Дата создания в формате timezone
 * @member {String} update_date - Дата обновления записи в формате timezone
 */
export interface Service {
  id?: number
  created_date?: TimeStamp
  update_dated?: TimeStamp
  name?: string
}

/**
 ** Описание интерфейса фильтров
 * @interface FilterService
 * @member {Number} id - Идентификатор
 * @member {String} name - Наименование сервиса
 * @member {String} created_date - Дата создани
 */
export interface FilterService {
  id?: Filter | null
  name?: Filter | null
  created_date?: Filter | null
}


/**
 ** Описание интерфейса фильтров
 * @interface FilterService
 * @member {Number} id - Идентификатор
 * @member {String} name - Наименование сервиса
 * @member {String} created_date - Дата создани
 */
export interface SortService {
  id?: Sort | null
  name?: Sort | null
  created_date?: Sort | null
}

/** 
** Описание интерфейса параметров запроса для получения списка
* @interface ParamsGetServices
*/
export interface ParamsGetServices {
  limit?: number
  offset?: number
  order?: string
  filter: Service
  sort: Service
}