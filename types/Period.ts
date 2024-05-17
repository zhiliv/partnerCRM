/** 
* @interface FieldsPeriod
* @member {Number} id - Идентификатор
* @member {String} name - Наименование
* @member {String} padez - Падеж
* @member {String} mnozh - Множественное число
*/
export interface FieldsPeriod{
  id?: number | null
  name: string | null
  padez: string | null
  mnozh: string | null
}

/** 
** @interface Period
* @member {Number} id - Идентификатор
*/
export interface Period{
  prd: FieldsPeriod
}

/** 
** Описание интерфейса параметров запроса для получения списка
* @interface ParamsGetPeriod
*/
export interface ParamsGetPeriod {
  limit?: number
  offset?: number
  order?: string
  filter: Category
  sort: Category
}