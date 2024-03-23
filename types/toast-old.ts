/*
 * @interface Toast
 * @member {number}  id - Идентификатор уведомления
 * @member {string} title - Заголовок
 * @member {string} message - Сообщение
 * @member {number} timer - Время отображения окна
 */
export interface Toast {
  id?: number
  title?: string
  message: string | unknown | any
  timer?: number
  type?: string
}
