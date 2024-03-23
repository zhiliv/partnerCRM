import { db } from '~/server/db'
import { Response } from '~/types/query'
import fs from 'fs'
import { SchemaDB } from '~/types/SchemaDB'

/** 
** Удаление свойства из объекта
* @function removeObjectProperty
* @param {Object} obj - Объект для удаления свойства
* @param {String} name - Имя свойства для удаления
*/
export const removeObjectProperty = (obj: object, name: string): object => {
  let newObj:any = { ...obj };
  delete newObj[name];
  return newObj;
}

/** 
** Получение колонок из схемы
* @function getColumnFromSchema
* @param {Object} obj- Схема для получения колонок
*/
export const getColumnFromSchema = (schema: SchemaDB): string[] | null => {
  if(!schema){
    return null
  } 
  const keys = Object.keys(schema.columns)
  const columns = keys.map((key: any) => `${schema.table}.${key} as ${schema.short}_${key}`)
  keys.forEach((col:object | object[]) => {
    if(schema.columns[col].type === 'JSONB'){
      schema.columns[col].columns.forEach((el:any) => {
        
      })
    }
  })
  
  return columns
}


/** 
** Сохранение изображения
* @function saveImage
* @param {String} table - Наименование таблицы
* @param {Number} id - Идентификатор
* @param {String} fileName - Имя файла
* @param {String} file - Данные файла
*/
export const saveImage = async (table: string, id: number, fileName: string | null, file: string) => {
  const base64Data = file.replace(/^data:([A-Za-z-+/]+);base64,/, '') // Данные файла
  if(!fs.existsSync(`./public/img/${table}/${id}`))  // Проверка существования директории 
    await fs.mkdirSync(`./public/img/${table}/${id}`)  // Создание директории
  await fs.writeFileSync(`./public/img/${table}/${id}/${fileName}`, base64Data, 'base64') // Запись данных в файл
  return { fileName, id }
}

/** 
** Удаление изображения
* @function delImage
* @param {String} path - путь к файлу 
*/
export const delImage = async (path: string | undefined) => {
  try {
    const checkFile = await fs.statSync(`./public/${path}`).isFile() // Проверка наличия файла
    if(checkFile) {
      await fs.unlinkSync(`./public/${path}`) // Удаление файла
      return true
    }
  }
  catch(err) {
    return 'Файл отсутствует'
  }
}

/** 
** Получение параметров для sql запроса
* @function getWhereSql
*/
export const getWhereSql = (params: any) => {
  if(!params) {
    return null
  }

  let result = ' WHERE ' // Результат формирования условия 
  const keys = Object.keys(params) // Получение ключей параметров 
  keys.forEach((key: any, index: number) => {
    let condition = ''
    
    switch(params[key].type) {
      case '=':
        condition = ' = '
        break
      case '>':
        condition = ' > '
        break
      case '>=':
        condition = ' >= '
        break
      case '<':
        condition = ' < '
        break
      case '<=':
        condition = ' <= '
        break
      case '%':
        condition = ' LIKE '
        break
      default:
        condition = ' = '
    }
    
    let isJson = false
    if(key.substring(0, 2) === 'o_') {
      isJson = key.split('_')[1]
    }


    if(isJson === false) {
      if(index === 0) {
        result += `  ${key} ${condition} '${condition === ' iLIKE ' ? '%' : ""}${params[key].value}${condition === ' iLIKE ' ? '%' : ""}' `
      }
      else result += ` AND ${key} ${condition} '${condition === ' iLIKE ' ? '%' : ""}${params[key].value}${condition === ' iLIKE ' ? '%' : ""}' `
    }
    else {
      let newKey = key.split('_').slice(2).join('_')
      if(index === 0) {
        result += ` WHERE ${isJson} ->> '${newKey}' ${condition} '${condition === ' iLIKE ' ? '%' : ""}${params[key].value}${condition === ' iLIKE ' ? '%' : ""}' `
      }
      else result += ` AND ${isJson} ->> '${newKey}' ${condition} '${condition === ' iLIKE ' ? '%' : ""}${params[key].value}${condition === ' iLIKE ' ? '%' : ""}' `

      // where information  ->> 'site' = '1'
    } 
  })


return result
}