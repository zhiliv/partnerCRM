import type { TimeStamp } from './Time'
import type { Sort } from './Filter'

/** 
** Описание интерфейса для полей категории
* @interface FieldsOrganization
* @member {Number} id - Идентификатор
* @member {String} name - Наименование Группы
* @member {String} created_date - Дата создания в формате timezone
* @member {String} update_date - Дата обновления записи в формате timezone
* @member {Object} information - Информация об организации
* @member {Object} images - Изображения
*/
export interface FieldsOrganization {
  id?: number | null
  created_date?: TimeStamp | null
  update_dated?: TimeStamp | null
  name?: string | null
  information?: any
  images?: any
  service_id: number | null
}

/**
 * @interface Organization
 * @member {Number} id - Идентификатор
 * @member {String} name - Наименование Группы
 * @member {String} created_date - Дата создания в формате timezone
 * @member {String} update_date - Дата обновления записи в формате timezone
 */
export interface Organization {
  org: FieldsOrganization
}

/** 
** Описание интерфейса параметров запроса для получения списка
* @interface ParamsGetOrganization
*/
export interface ParamsGetOrganization {
  limit?: number
  offset?: number
  order?: string
  filter: Organization
  sort: Organization
}