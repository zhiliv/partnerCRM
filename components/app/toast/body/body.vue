<template>
  <div class="alert m-2 max-w-md min-w-md">
    <div class="flex-col">
      <Message :severity="type" :life="timer" @close="onClose">
        <h5 v-if="title">{{ title }}</h5>
        <p>{{ message }}</p>
      </Message>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * @type Props
 * @param {Number} id - Идентификатор уведомления
 * @param {String} title - Заголовок
 * @param {String} message - Сообщения уведомления
 * @param {Number} timer - Таймер закрытия окна
 * @param {String} type - Тип уведомления
 */
type Props = {
  id: number
  title: string
  message: string
  timer: number
  type: 'info' | 'success' | 'warning' | 'error'
}

/** Установка значения по умолчанию для входных свойств */
const props = withDefaults(defineProps<Props>(), {
  id: 0,
  title: '',
  message: '',
  timer: 15000,
  type: 'info',
})

/* Вычисление класса для уведомления */
const alertClass = computed(() => {
  return `alert-${props.type}`
})

/* Вычисление заголовка */
const getTile = computed(() => {
  if(props.title) return props.title
  switch(props.type) {
    case 'info':
      return 'Информация'
    case 'success':
      return 'Успех'
    case 'warning':
      return 'Внимание'
    case 'error':
      return 'Ошибка'
  }
})

/* Установка таймаута удаления сообщения */
setTimeout(() => {
  emitter.emit('remove-toast', { id: props.id }) // Отправка события о закрытии уведомления
}, props.timer)

/**
 ** Событие при нажатии на закрытие уведомления
 * @function onClose
 */
const onClose = async () => {
  emitter.emit('remove-toast', { id: props.id }) // Отправка события о закрытии уведомления
}
</script>