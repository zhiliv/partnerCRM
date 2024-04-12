/**
 ** Установка лимитов для запросов
 * @function setLimit
 * @param {Number} limit - Лимит
 * @param {Number} offset - Смещение
 */
export const getLimit = (limit: number, offset: number) => {
  return ` 
    LIMIT ${limit} 
    OFFSET ${offset}
  `
}

/**
 ** Установка сортировки
 * @function setSort
 * @param {Object} sort - Параметры сортировки
 * @return {String}
 */
export const getSort = (sort: any) => {
  const sorted = JSON.parse(sort)
  const asc: string[] = [] // Массив полей в восходящем порядке(от меньшего к большему)
  const desc: string[] = [] // Массив полей для сортировки в нисходящем порядке(от большего к меньшему)

  const keys = Object.keys(sorted) // Получение ключей сортировки

  keys.forEach((key: string) => {
    if(sorted[key]) {
      if(sorted[key] === 'asc') asc.push(key)
      if(sorted[key] === 'desc') desc.push(key)
    }
  })

  const result = ` 
    ORDER BY `

  const stringASC = asc.length > 0 ? ` ${asc.join(', ')} ASC` : ''
  const stringDESC = desc.length > 0 ? ` ${desc.join(', ')} DESC` : ''
  return stringASC || stringDESC ? `${result} 
    ${stringASC.length && stringDESC.length ? `${stringASC}, ${stringDESC}` : stringASC || stringDESC}` : ''
}

/** 
** Установка фильтров
* @function getFilter
* @param {Object} filter - Параметры фильтрации
*/
export const getFilter = (filter: any) => {
  
  const keys = Object.keys(filter) // Получение фильтров
  let result = keys.length && Object.values(filter).filter((val: any) => val && val.value).length ? ' WHERE ' : ' '

  keys.forEach((key: string, index: number) => {
    if(filter[key] && filter[key].filter && filter[key].value && filter[key].type !== 'date') {
      let condition = ''
      switch(filter[key].filter) {
        case '=':
          condition = '='
          break;
        case '!=':
          condition = '<>'
          break
        case 'like':
          condition = ' LIKE '
          break
        case 'not like':
          condition = ' NOT LIKE '
          break
        case '>':
          condition = ' > '
          break
        case '<':
          condition = ' < '
          break
        default:
          condition = ' = '
          break;
      } // Получение условия фильтрации

      let value = ''
      if(filter[key].filter === 'like' || filter[key].filter === 'not like') value = `%${filter[key].value}%`
      else value = filter[key].value // Получение значение фильтра
      
      if(filter[key].type === 'string'){
        if(result === ' WHERE ') result += ` LOWER(${key}) ${condition} '${value}' `
        else result += ` AND LOWER(${key}) ${condition} '${value}'  `  
      }
      
      if(filter[key].type === 'number') {
        if(result === ' WHERE ') result += ` ${key} ${condition} ${value} `
        else result += ` AND ${key} ${condition} ${value}  `
      }
      
    }
    else if(filter[key] && filter[key].filter && filter[key].value && filter[key].type === 'date'){
      if(result === ' WHERE '){
        result += ` ${key} BETWEEN  '${filter[key].value[0]}' AND '${filter[key].value[1]}' `
      }
      else result += ` AND ${key}  BETWEEN  '${filter[key].value[0]}' AND '${filter[key].value[1]}' `
    }
  })
  return result
}