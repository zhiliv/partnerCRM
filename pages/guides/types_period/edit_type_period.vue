<template>
  <app-spinner
    class="w-full"
    v-if="!isLoad"
  />
  <div class="p-2 overflow-y-auto shadow shadow-zinc-300 rounded-lg border">
    <app-input
      :is-valid="isValid.name"
      class="standart w-full input"
      label="Наименование"
      v-model="data.name"
    />
    <app-input
      :is-valid="isValid.padez"
      class="standart w-full input"
      label="Родительский падеж"
      v-model="data.padez"
    />
    <app-input
      :is-valid="isValid.mnozh"
      class="standart w-full input"
      label="Множественное число"
      v-model="data.mnozh"
    />
  </div>
</template>

<script lang="ts" setup>
import { useTypesPeriodStore } from '~/stores/types-period-store'
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
  padez: String
  mnozh: String
  id: number | null
}

/** 
* Данные формы
* @member {String} name - Наименование
*/
const data = ref({
  name: null,
  padez: null,
  mnozh: null,
  id: null,
}) // Данные формы

/** 
* Данные валидации
* @member {Boolean} name - Валидация наименования
*/
const isValid = ref({
  name: false,
  padez: false,
  mnozh: false,
  result: false
})

const isLoad = ref(false) // Статус загрузки данных
const store = useTypesPeriodStore() // Создание нового стора
const id = ref(props.modelValue.id) // Идентификатор записи

onMounted(async () => {
  const response = await store.getRecord(id.value)
  isLoad.value = true
  data.value.id = id
  data.value.name = response.value.name
  data.value.padez = response.value.padez
  data.value.mnozh = response.value.mnozh
})


/**
* Наблюдатель для установки валидации
*/
watch(data.value, (newVal: Data) => {
  isValid.value.name = !!(newVal.name && newVal.name.length && newVal.name.length > 3) // Установка валидации для поля "Наименование"
  isValid.value.padez = !!(newVal.padez && newVal.padez.length && newVal.padez.length > 2) // Установка валидации для поля "Родительский падеж"
  isValid.value.mnozh = !!(newVal.mnozh && newVal.mnozh.length && newVal.mnozh.length > 2) // Установка валидации для поля "Множественное число"
  isValid.value.result = getValidForm(isValid.value)
  emit('valid', { save: !isValid.value.result })
  emit('data', data.value)
})

</script>~/stores/default~/stores-old/types-period-store