<!-- eslint-disable vue/valid-v-for -->
<template>
  <div class="absolute right-4 bottom-16 z-100">
    <app-toast-body
      :class="item.class"
      :id="item.id"
      :key="item.id"
      :message="item.message"
      :timer="item.timer"
      :title="item.title"
      :type="item.type"
      v-for="item in list"
    ></app-toast-body>
  </div>
</template>

<script lang="ts" setup>
const list: any = ref([]) // Список уведомлений
const ind = ref(0) // Индекс уведомления

/** Отслеживание события для отображения уведомлений */
emitter.on('show-toast', (event: any) => {
  if(event) {
    event.id = ind.value++
    list.value.push(event) // Добавление уведомления в список
  }
})

/**  Прослушивание события для удаления уведомления */
emitter.on('remove-toast', (event: any) => {
  const index = list.value.findIndex((el: any) => el.id === event.id) // Получение индекса сообщения
  list.value.splice(index, 1) // Удаление элемента из массива
})
</script>
