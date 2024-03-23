import mitt from 'mitt'
import { uuid } from 'vue-uuid'

export default defineNuxtPlugin(() => {
  const emitter = mitt()

  /*
   * Показать модальное окно
   * @function showModal
   * @param {String} nameForm - Имя формы
   * @param {Object} event - Объект события
   */
  const showModal = async (nameForm, event) => {
    if (!event) event = {}
    event.formUuid = uuid.v4() // Добавление идентификатора формы
    event.form = nameForm // Передача значения имени формы
    emitter.emit(`show-modal`, event) // Отправка события для показа модального окна
    /* Создание ожидания ответа закрытия модального окна для возврата результата */
    const listenCloseModal = () => {
      return new Promise((resolve, reject) => {
        emitter.on(`close-modal-${event.formUuid}`, eventClose => {
          // прослушивание уникального события закрытия окна
          emitter.emit(`destroy-modal-${event.formUuid}`) // отправка события для скрытия окна
          delete eventClose.modalTitle
          delete eventClose.formUuid
          delete eventClose.form
          resolve(eventClose) // получение ответа в promise
        })
      })
    }
    const result = await listenCloseModal() // возврат результата
    return result
  }

  /*
   * Отображение модального окна подтверждения действия
   * @function showConfirm
   * @param {Object} args - Аргументы
   */
  const showConfirm = async args => {
    emitter.emit('show-confirm', args || {})
    const listenCloseConfirm = () => {
      return new Promise((resolve, reject) => {
        emitter.on('close-confirm', response => {
          resolve(response)
        })
      })
    }
    const result = await listenCloseConfirm()
    return result
  }

  /*
   * Отображение модального окна для отображения списка с мульти-выбором
   * @function showMultiSelect
   * @param {Object} args - Аргументы
   */
  const showMultiSelect = async args => {
    emitter.emit('show-multiselect', args || {})
    const listenCloseConfirm = () => {
      return new Promise((resolve, reject) => {
        emitter.on('close-multiselect', response => {
          resolve(response)
        })
      })
    }
    const result = await listenCloseConfirm()
    return result
  }

  /*
   * Отображение уведомления
   * @function showToast
   * @param {Object} args - Аргументы
   */
  const showToast = async args => {
    emitter.emit('show-toast', args)
  }

  return {
    provide: {
      showModal,
      showConfirm,
      showToast,
      showMultiSelect,
      event: emitter.emit, // Will emit an event
      listen: emitter.on, // Will register a listener for an event
    },
  }
})
