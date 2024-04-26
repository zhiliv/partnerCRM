<template>
  <div class="flex flex-col w-full">
    <div class="justify-start flex text-center items-center">
      {{ title }}
      <Button class="ml-1 pi min-w-[28px] min-h-[28px] w-[28px] h-[28px]  p-[6px] text-zinc-900"
        :class="{ 'pi-arrows-v': sort === null, 'pi-arrow-down': sort === 'desc', 'pi-arrow-up': sort === 'asc' }" text @click="sorted" size="small" />
    </div>
    <div class="items-center flex mt-2">
      <Button class="mr-1 pi pi-filter min-w-[28px] min-h-[28px] w-[28px] h-[28px] p-1 text-zinc-400" text @click="toggle"
        v-if="type === 'string' || type === 'number'" />
      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" v-if="type === 'string' || type === 'number'" />
      <InputText class="w-full" size="small" v-model="data" v-if="type === 'string' || type === 'number'" />
      <ClientOnly>
        <Calendar v-if="type === 'date'" v-model="data" showTime hourFormat="24" dateFormat="yy-mm-dd" showSeconds size="small" inputClass="h-[37.2px] text-xs"
          class="w-full" selectionMode="range" />
      </ClientOnly>
      <Button class="ml-1 pi pi-check min-w-[28px] min-h-[28px] w-[28px] h-[28px]  p-1 text-green-800" text @click="apply" />
      <Button class="mr-1  pi pi-times min-w-[28px] w-[28px] h-[28px] min-h-[28px] p-1 text-red-500" text @click="clear" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ItemMenu } from '~/types/Table'

const emit = defineEmits(['update:filter', 'update:sort'])

/** 
** @interface Props
* @member {string} title - Заголовок
* @member {any} field - Поле
*/
interface Props {
  title: string
  field: string
  type: 'string' | 'number' | 'date' | 'boolean'
}
const data = ref<string | null>(null) // Значение
const menu = ref() // Ссылка на элемент меню
const filter = ref<any>(null) // Значение фильтра
const sort = ref<any>(null) // Сортировка

const props = withDefaults(defineProps<Props>(), {
  title: '', // Заголовок
  field: '' // Значение поля
})

const items = reactive<ItemMenu[]>([
  {
    label: 'Равно',
    target: '=',
    command: () => { filter.value = '=' },
  },
  {
    label: 'Не равно',
    target: '!=',
    command: () => { filter.value = '!=' },
  },
  {
    label: 'Содержит',
    target: 'like',
    command: () => { filter.value = 'like' },
  },
  {
    label: 'Не содержит',
    target: 'not like',
    command: () => { filter.value = 'not like' },
  },
  {
    label: 'Больше',
    target: '>',
    command: () => { filter.value = '>' },
    visible: () => props.type === 'number',
  },
  {
    label: 'Меньше',
    target: '<',
    command: () => { filter.value = '<' },
    visible: () => props.type === 'number',
  },
])

/** 
** Отображение/скрытие меню
* @functino toggle
* @param {any} event - Данне события
*/
const toggle = (event: any) => {
  menu.value.toggle(event)
}

/** 
** Применение фильтров
* @function apply
*/
const apply = () => {
  if(filter.value){
    emit('update:filter', { filter: filter.value, value: data.value, type: props.type }) // Отправка события  
  }
  else{
    emit('update:filter', null) // Отправка события  
  }
  
}

/** 
** Очистка фильтров
* @function clear
*/
const clear = () => {
  data.value = null
  filter.value = '='
  emit('update:filter', null) // Отправка события
}

/** 
** Сортировка
* @function sorted
*/
const sorted = () => {
  if(sort.value === null) sort.value = 'desc'
  else if(sort.value === 'asc') sort.value = 'asc'
  else sort.value = null
  emit('update:sort', sort.value ) // Отправка события 
}

onMounted(() => {
  filter.value = '='
})

watch(filter, (newVal) => {
  items.forEach((el: any) => el.class = '') // Очистка классов выделения элемента
  const index = items.findIndex((el: any) => el.target === newVal) // Индекс элемента
  items[index].class = 'bg-green-200'
})
</script>