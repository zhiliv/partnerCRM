import type { Toast } from '~/types/Toast'
import type { ResponseHTTP } from '~/types/ResponseHTTP'
import mitt from 'mitt'
export const emitter = mitt()

/**
 ** Отображение уведомления
 * @function showToast
 * @param {Object} args - Аргументы
 */
export const showToast = async (args: Toast): Promise<void> => {
  emitter.emit('show-toast', args)
}

/** 
** Отображение уведомления при выполнении запросов
* @function progressingResponse
* @param {ResponseHTTP} event - Данные о событии
* @param {boolean} isSuccess - Отображать ли уведомление если запрос успешен
*/
export const progressingResponse =  (event: ResponseHTTP, isSuccess?: boolean): boolean => {
  
  if(event.statusCode === 200 && isSuccess) {
    showToast({
      type: 'success',
      message: event.message,
      title: 'Успешно',
    })
    return true
  }
  
  else if(event.statusCode === 200) {
    return true
  }

  else if(event.statusCode === 500) {
    showToast({
      type: 'error',
      message: event.message,
      title: 'Ошибка',
    })
    console.error(event.message, event)
    return false
  }

  else if(event.statusCode === 400 || event.statusCode === 401) {
    showToast({
      type: 'warn',
      message: event.message,
      title: 'Внимание',
    })
    return false
  }
  
    return false
  
  
}