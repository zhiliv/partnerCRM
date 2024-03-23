/** 
** Описание ответа с сервера
* @interface
* @member {Number} statusCode - Статус ответа
* @member {String} message - Сообщение сервера
* @member {Any} data - Данные ответа
*/
export interface Response {
  statusCode: number
  message: string
  data?: any
}