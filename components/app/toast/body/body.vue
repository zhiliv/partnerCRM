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
import type {Toast} from '~/types/Toast'

/** Установка значения по умолчанию для входных свойств */
const props = withDefaults(defineProps<Toast>(), {
  id: 0,
  title: '',
  message: '',
  timer: 15000,
  type: 'info',
})

/* Установка таймаута удаления сообщения */
setTimeout(() => {
  emitter.emit('remove-toast', { id: props.id }) // Отправка события о закрытии уведомления
}, props.timer)

/**
 ** Событие при нажатии на закрытие уведомления
 * @async
 * @function onClose
 */
const onClose = async () => {
  emitter.emit('remove-toast', { id: props.id }) // Отправка события о закрытии уведомления
}
</script>