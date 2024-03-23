<template>
  <app-spinner
    class="w-full"
    v-if="!isLoad"
  />
  <div
    class="p-2 overflow-y-auto shadow shadow-zinc-300 p-2 rounded-lg border"
    v-if="isLoad"
  >
    <app-input
      :is-valid="isValid.name"
      class="standart w-full input"
      label="Наименование"
      v-model="data.name"
    />
    <app-textarea
      :is-valid="isValid.description"
      label="Описание"
      class="h-[150px]"
      v-model="data.description"
    ></app-textarea>
  </div>
</template>

<script lang="ts" setup>
import { useSitesStore } from '~/stores/sites-store'
const emit = defineEmits(['valid', 'data'])

/** 
* @interface Props
* @member {Object} modelValue - Данные формы
*/
interface Props {
  modelValue?: any
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
})

/** 
* Модель данных для формы
* @interface Data
*/
interface Data {
  name: String | null
  description: String | null
  id: number | null
}

/** 
* Данные формы
* @member {String} name - Наименование
* @member {String} description - Описание
*/
const data = ref({
  name: null,
  description: null,
  id: null,
}) // Данные формы

/** 
* Данные валидации
* @member {Boolean} name - Валидация наименования
* @member {Boolean} description - Валидация описания
*/
const isValid = ref({
  name: false,
  description: false,
  result: false
})

const isLoad = ref(false) // Статус загрузки данных
const store = useSitesStore() // Создание нового стора
const id = ref(props.modelValue.id) // Идентификатор записи

onMounted(async () => {
  const response = await store.getRecord(id.value)
  isLoad.value = true
  data.value.id = id
  data.value.name = response.value.name
  data.value.description = response.value.description
})


/**
* Наблюдатель для установки валидации
*/
watch(data.value, (newVal: Data) => {
  isValid.value.name = !!(newVal.name && newVal.name.length && newVal.name.length > 3) // Установка валидации для поля "Наименование"
  /* Установка валидации для поля "Описание" */
  if(newVal.description) {
    if(newVal.description.length > 3) isValid.value.description = true
    else isValid.value.description = false
  }
  else isValid.value.description = false
  isValid.value.result = getValidForm(isValid.value)
  emit('valid', { save: !isValid.value.result })
  emit('data', data.value)
})

</script>~/stores/default~/stores-old/sites-store