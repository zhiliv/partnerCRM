/** 
** @interface
* @member { number } statusCode - Код статуса
* @member { any } data - Данные
* @member { string } message - Сообщение
*/
export interface ResponseHTTP {
  statusCode: number
  data?: any
  message: string
}
