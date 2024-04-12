import type { User } from './User'
import type { TimeStamp } from './Time'

/** 
** @interface AuthLogger
** Модель для таблицы "access.auth_logger"
* @member { number } id - Идентификатор записи
* @member { number } user_id - Идентификатор пользователя
* @member { timestamp } date_auth - Дата\время авторизации
* @member { timestamp } created_date - Дата\время попытки авторизации
* @member { boolean } status - Статус авторизации
* @member { string } token - Токен авторизации
* @member { string } comment - Комментарии
*/
export interface AuthLogger {
  id?: number,
  user_id: number | null
  date_auth?: TimeStamp | null
  created_date?: TimeStamp | null
  status?: boolean | null
  token?: string | null
  comment?: string | null
}

/** 
** @interface RequestAuth
** Данные авторизации
* @member { string } login - Логин пользователя
* @member { string } password - Пароль пользователя
*/
export interface RequestAuth {
  login: string
  password: string
}

/** 
** @interface GetUser
** Данные о пользователе
* @member { string } error - Ошибка
* @member { User } data - Данные
*/
export interface GetUser {
  error?: string | null
  data?: User | null
}

/** 
** Модель получения количества попыток авторизации
* @interface CheckCountAuth 
* @member { string } error - Текст ошибки
* @member { number } count - Количество попыток авторизации
*/
export interface CheckCountAuth {
  error?: string | null
  count?: number  | null
}


export interface Count {
  count?: number | null
}