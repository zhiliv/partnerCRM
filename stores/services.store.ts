import { defineStore } from 'pinia'
import { Service } from '~/types/service'
import { Response } from '~/types/Response'

export const useStoreServices = defineStore('services', () => {
  const list = ref<any>([]) // Список строк полученных из таблицы
  const count = ref<number | any>(0) // Количество строк полученных при запросе
  const isLoading = ref<boolean>(true) // Статус загрузки данных
  const limit = ref<number>(50) // Лимит выбора строк
  const offset = ref<number>(0) // Сдвиг поиска

  /** 
  ** Получение списка сервисов
  * @function getList
  */
  const getList = async () => {
    isLoading.value = true
    // await getCount()
    const url: string = `/api/services/all` // Ссылка для получения данных
    try {
      const response: Response = await $fetch(url) // Получение списка с сервера
      if(response.statusCode !== 200) {
        showToast({ message: response.message, type: 'error' })
      }
      list.value = response.data
      isLoading.value = false
    }
    catch(err: any) {
      showToast({ message: err, type: 'error' })
    }
  }

  /** 
  ** Получение количества всех строк
  * @function getCount
  */
  const getCount = async () => {
    isLoading.value = true
    // await getCount()
    const url: string = `/api/services/count` // Ссылка для получения количества записей
    try {
      const response: Response = await $fetch(url) // Получение количества с сервера
      if(response.statusCode !== 200) {
        showToast({ message: response.message, type: 'error' })
      }
      count.value = +response.data
      isLoading.value = false
    }
    catch(err: any) {
      showToast({ message: err, type: 'error' })
    }
  }

  /** 
  ** Создание записи
  * @function create
  */
  const create = async (params: Service) => {
    const url: string = `/api/services/add` // Ссылка 
    try {
      const response: any = await $fetch(url, { method: 'put', body: params}) // Получение количества с сервера
      if(response.statusCode !== 200) {
        showToast({ message: response.message, type: 'error' })
      }
      count.value = +response.data
      showToast({ message: response.message, type: 'success' })
      return response
    }
    catch(err: any) {
      showToast({ message: err, type: 'error' })
    }    
  }
  
  /** 
  ** Получение данных по идентификатору
  * @function get
  */
  const get = async (params: any) => {
    console.log("🚀 -> get -> params:", params)
    const id: number = params.srvcs_id
    console.log("🚀 -> get -> id:", id)
    const url: string = `/api/services/get` // Ссылка
    try{
      const response: Response = await $fetch(url, {  params: { id }})
      if(response.statusCode !== 200) {
        showToast({ message: response.message, type: 'error' })
      }
    }
    catch(err){
      
    }
  }

  return { getList, getCount, count, list, limit, offset, create, isLoading, get }
})