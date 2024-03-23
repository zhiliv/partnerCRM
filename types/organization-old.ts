/**
** Описание сущности "Данные организации"
* @interface Information
* @param { String } Ur_name - Юридическое название организации
* @param { Array } Ur_address - Адреса организации
* @param { String } Ur_name - Юридическое наименование
* @param { String } description - Описание
* @param { String } short_description - Короткое описание
* @param { String } site - Сайт организации
* @param { Array } images - Изображения организации
* @param { Number } INN - ИНН организации
* @param { Number } OGRN - ОГРН организации
* @param { Array } phones - Номера телефонов
*/
export interface Information {
  Ur_name: string | null
  Ur_address: string | null
  description: string | null
  short_description: string | null
  site: string | null
  INN: number | null
  OGRN: number | null
  phones: string | null
}



/** 
** Описание сущности файла загрузки для организации\
* @interface File
* @param {NUmber} id - Идентификатор
* @param {Number} id_organization - Идентификатор органищации
* @param {String} path - Путь к файлу 
* @param {String} label - Описание файла
* @param {Number} lastModified - Время модификации в секундах
* @param {Date} lastModifiedDate - Дата модификации файла
* @param {String} name - Имя файла
* @param {Number} size - Размер файла
* @param {String} type - Тип файла
* @param {String} webkitRelativePath - Папка для загрузки
* @param {String} dataFile - Содержимое файла
* @param {Boolean} isNew - Признак нового файла
* @param {Boolean} isDel - Признак удаления файла
*/
export interface File {
  id?: Number
  id_organization?: number
  path?: string
  label: string
  lastModified: number
  lastModifiedDate: Date
  name: string
  size: Number
  type: string
  webkitRelativePath?: string
  dataFile: string
  isNew?: boolean
  isDel?: boolean
  fileName: string | null
}



/** 
** Описание сущности "Изображения"
* @interface Image
* @param {Number} id - Идентификатор
* @param {String} name - Имя изображения
* @param {String} path - Путь к изображения
* @param {Boolean} isLicense - Признак лицензии
* @param {Boolean} isNew - Признак нового изображения
* @param {Boolean} isDel - Признак удаления изображения
* @param {String} label - Описание изображения
* @param {Boolean} isMain - Главное описание изображения
*/
export interface Image {
  id: number
  name: string
  path: string
  isLicense?: boolean
  isNew?: boolean
  idDel?: boolean
  isMain?: boolean
}



/**
** Описание сущности "Организация
* @type organization
* @param {String} name - Наименование
* @param {String} description - Описание
* @param {String} short_description - Короткое описание
* @param {Number} id - Идентификатор
* @param {File[]} images - Список изображений
* @param {String } table - Таблица
*/
export interface Organization {
  name: string
  id: number
  images: Image[]
  information: string
}