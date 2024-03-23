/**
 * @interface Query
 * @member {string} url - URL запроса
 * @member {string} method - Метод отправки запроса
 * @member {any} body - Тело запроса
 */
export interface Query  {
  url: string
  method?: 'post' | 'get' | 'put' | 'delete' | 'patch' | 'options' | 'head' | undefined
  body?: any | string | number
}

/*
 * @interface Response
 * @member {number} status - Код ответа HTTP
 * @member {string} typeMessage - Тип сообщения
 * @member {string} message - Сообщение
 * @member {any} data - Данные
 */
export interface Response  {
  status?: number
  typeMessage?: 'success' | 'warning' | 'error'
  message?: string
  data?: any
}
