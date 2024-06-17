import type { EditField, Field, FieldsField } from '~/types/Field'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import { defineStore } from 'pinia'

export const useStoreFields = defineStore('fields', () => {
  const list = ref<any>([]) // Список строк полученных из таблицы
  const count = ref<number | any>(0) // Количество строк полученных при запросе
  const listTable = ref<any>([])
  const table = ref<string>('') // Наименование таблицы для поиска
  const sort = ref<Field>({ 
    fld: {
      id: null,
      table: null,
      created_date: null,
      values: {
        name: null,
        label: null,
        description: null,
        type: null
      }
    }
  }) // Сортировка
  const isLoading = ref<boolean>(true) // Статус загрузки данных
  const limit = ref<number>(50) // Лимит выбора строк
  const offset = ref<number>(0) // Сдвиг поиска
  const record = ref<EditField>({name: null, label: null, description: null, type: null}) // Запись
  const filter = ref<Field | any>({})

  /** 
  ** Получение списка дополнительных полей
  * @function getList
  */
  const getList = async (): Promise<boolean> => {
    await getCount() // Получение количества всех записей
    isLoading.value = true
    await getCount()
    const url: string = `/api/fields/all` // Ссылка для получения данных
    try {
      const response: ResponseHTTP = await $fetch(url, {
        params: { limit: limit.value, offset: offset.value, filter: filter.value, sort: sort.value },
      }) // Получение списка с сервера1`
      const checkResponse: boolean = progressingResponse(response) // Проверка на успешное выполнение
      if(checkResponse) {
        list.value = response.data // Установка списка
        isLoading.value = false // Статус загрузки
        return true
      }
    }
    catch(err: any) {
      showToast({ message: err, type: 'error' })
    }
    return false
  }

  /** 
  ** Получение количества всех строк
  * @function getCount
  */
  const getCount = async (): Promise<boolean> => {
    isLoading.value = true // Статус загрузки
    const url: string = `/api/fields/count` // Ссылка для получения количества записей
    try {
      const response: ResponseHTTP = await $fetch(url, { params: { limit: limit.value, offset: offset.value, filter: filter.value, sort: sort.value } }) // Получение количества с сервера
      const checkResponse: boolean = await progressingResponse(response)
      if(checkResponse) {
        count.value = +response.data
        isLoading.value = false
        return true
      }
    }
    catch(err: any) {
      showToast({ message: err, type: 'error' })
    }
    return false
  }

  /** 
  ** Создание записи
  * @function create
  */
  const create = async (): Promise<boolean> => {
    const url: string = `/api/fields/add` // Ссылка 
    try {
      const response: ResponseHTTP = await $fetch(url, { method: 'put', body: record.value }) // Получение количества с сервера
      progressingResponse(response, true)
      return true
    }
    catch(err: any) {
      showToast({ message: err, type: 'error' })
    }
    return false
  }

  /** 
  ** Получение данных по идентификатору
  * @function get
  */
  const get = async (): Promise<boolean> => {
    if(!record.value.id) {
      showToast({ message: 'Неизвестная ошибка при получении полей', type: 'error' })
      return false
    }

    const id: number = record.value.id // Получение идентификатора
    const url: string = `/api/fields/get` // Ссылка
    try {
      const response: ResponseHTTP = await $fetch(url, { params: { id } })
      await progressingResponse(response)
      record.value = response.data // Установка значения полей
      return true
    }
    catch(err: any) {
      showToast({ message: err.message || 'Произошла ошибка', type: 'error' });
    }
    return false
  }
  
  /** 
  ** Получение данных по сущности
  * @function getTable
  */
  const getTable = async (): Promise<boolean> => {
    
    const url: string = `/api/fields/get-table` // Ссылка
    try {
      const response: ResponseHTTP = await $fetch(url, { params: { table: table.value } })
      await progressingResponse(response)
      listTable.value = response.data
      return true
    }
    catch(err: any) {
      showToast({ message: err.message || 'Произошла ошибка', type: 'error' });
    }
    return false
  }


  /** 
  ** Обновление записи
  * @function update
  */
  const update = async (): Promise<boolean> => {
    const url: string = `/api/fields/update` // Ссылка
    try {
      const response: ResponseHTTP = await $fetch(url, { method: 'post', body: record.value }) // Получение количества с сервера
      await progressingResponse(response, true)
      return true
    }
    catch(err: any) {
      showToast({ message: err, type: 'error' })
    }
    return false
  }

  /** 
  ** Удаление записи
  * @function del
  */
  const del = async (): Promise<boolean> => {
    const url: string = `/api/fields/del` // Ссылка
    try {
      const response: ResponseHTTP = await $fetch(url, { method: 'delete', body: record.value }) // Получение количества с сервера
      const checkResponse: boolean = progressingResponse(response, true) // Проверка на успешное выполнение 
      return checkResponse
    }
    catch(err: any) {
      showToast({ message: err, type: 'error' })
    }

    return false
  }

  return { getList, getCount, count, list, limit, offset, create, isLoading, get, record, update, del, sort, filter, getTable, table, listTable }
})