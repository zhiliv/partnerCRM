/**
 ** Интерфейс для описания колонки таблицы
 * @interface Column
 * @member {string} field - Наименование колонки
 * @member {string} header - Заголовок
 */
export interface Column {
  field: string
  header: string
}

/**
 ** Интерфейс для описания пункта меню фильтра
 * @interface ItemMenu
 * @member {string} label - Название пункта меню
 * @member {string} target - Значение пункта меню
 * @member {string} command - Команда пункта меню
 * @member {string} class - Класс пункта меню
 * @member {boolean} visible - Признак видимости пункта меню
 */
export interface ItemMenu {
  label: string
  target: string
  command: () => void
  class?: string
  visible?: () => boolean
}
