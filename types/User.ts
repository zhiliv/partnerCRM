import type { TimeStamp } from './Time'

export interface VerifyJWT {
  id: number  // Идентификатор пользователя
}

/** 
** Модель для таблицы "access.users"
* @interface
* @member { number } id - Идентификатор пользователя
* @member { string } user - Имя пользователя
* @member { string } hash_pwd - Хэш пароля
* @member { date } created_date - Дата\время создания пользователя
* @member { date } updated_date - Дата\время обновления данных пользователя
* @member { string } email - Почта пользователя
* @member { boolean } is_active - Признак активного пользователя
*/
export interface User {
  id: number
  user: string
  hash_pwd: string
  created_date: TimeStamp
  updated_date?: TimeStamp
  email?: string
}

