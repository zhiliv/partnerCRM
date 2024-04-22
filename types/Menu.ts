/**
* Инетрфейс меню  
*@interface Item
* @member {string} label - Название пункта меню
* @member {string} icon - Иконка пункта меню
* @member {string} url - URL пункта меню
* @member {string} class - Класс пункта меню
*/
export interface Item {
  label: string
  icon?: string
  url: string
  class?: string
}