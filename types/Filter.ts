/** 
** Описание интерфейса фильтров таблицы
* @interface Filter
* @member {string} field - Поле
* @member {string} filter - Фильтр
* @member {any} value - Значение
*/
export interface Filter {
  field: string
  filter: string
  value: any
}

/** 
** Описание интерфейса сортировки
* @interface Order
* @member {string} field - Поле
* @member {string} order - Сортировка
*/
export interface Sort {
  field: string | null
  value: string | null
}