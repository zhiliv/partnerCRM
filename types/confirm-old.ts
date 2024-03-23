
/**
 * @interface Confirm
 * @member {String} confirmText - Текст кнопки подтверждения
 * @member {String} cancelText - Текст кнопки отмены
 * @member {String} message - Текст сообщения
 * @member {Boolean} isShow - Статус отображения окна
 */
export interface Confirm {
  confirmText?: string
  cancelText?: string
  message?: string
}