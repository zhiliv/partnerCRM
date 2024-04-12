/** 
** Описание интерфейса Toast
* @interface Toast
* @member {string} class - Классы стилей для оповещения
* @member {string} id - Идентификатор уведомления
* @member {string} message - Выводимое сообщение
* @member {number} timer - Время отображения сообщения
* @member {'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'} type - Тип сообщения
*/
export interface Toast{
  class?: string
  id?: number
  message: string
  timer?: number
  type: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'
  title?:string
}