/** 
** @interface Service
* @member {Number} id - Идентификатор
* @member {String} name - Наименование сервиса
* @member {String} created_date - Дата создания в формате timezone
* @member {String} update_date - Дата обновления записи в формате timezone
*/
export interface Service {
  srvcs_id?: number
  srvcs_name?: string
  srvcs_created_date?: string
  srvcs_update_date?: string
  name?: string
}