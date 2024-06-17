import type { Organization, FieldsOrganization } from '~/types/Organization'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import { defineStore } from 'pinia'


export const useStoreOrganizations = defineStore('organizations', () => {
  const list = ref<any>([]) // Список строк полученных из таблицы
  const count = ref<number | any>(0) // Количество строк полученных при запросе
  const sort = ref<Organization>({
    org: {
      id: null,
      name: null,
      created_date: null,
      information: null,
      images: null
    }
  }) // Сортировка
  const isLoading = ref<boolean>(true) // Статус загрузки данных
  const limit = ref<number>(50) // Лимит выбора строк
  const offset = ref<number>(0) // Сдвиг поиска
  const record = ref<FieldsOrganization>({name: null, information: []}) // Запись
  const filter = ref<Organization | any>({}) // Фильтры

  /** 
  ** Получение списка организаций
  * @function getList
  */
  const getList = async (): Promise<boolean> => {
    await getCount() // Получение количества всех записей
    isLoading.value = true
    await getCount()
    const url: string = `/api/organizations/all` // Ссылка для получения данных
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
    const url: string = `/api/organizations/count` // Ссылка для получения количества записей
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
    const url: string = `/api/organizations/add` // Ссылка 
    try {
      console.log(record)
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
      showToast({ message: 'Неизвестная ошибка при получении Группы', type: 'error' })
      return false
    }

    const id: number = record.value.id // Получение идентификатора
    const url: string = `/api/organizations/get` // Ссылка
    try {
      const response: ResponseHTTP = await $fetch(url, { params: { id } })
      console.log("🚀 -> get -> response:", response)
      await progressingResponse(response)
      record.value = response.data // Установка значения Группы
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
    const url: string = `/api/organizations/update` // Ссылка
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
    const url: string = `/api/organizations/del` // Ссылка
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

  return { getList, getCount, count, list, limit, offset, create, isLoading, get, record, update, del, sort, filter }
})