<template>
  <app-spinner v-if="!isLoad" class="w-full" />
  <div class="p-2  overflow-y-auto shadow shadow-zinc-300 p-2 rounded-lg border">
    <app-input v-model="data.name" class="standart w-full input" label="Наименование" :is-valid="isValid.name" />
  </div>
</template>

<script lang="ts" setup>
import { useTypeDocsStore } from '~/stores/type-docs-store'
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
interface Data{
  name: String | null
  id: number | null
}

/** 
* Данные формы
* @member {String} name - Наименование
*/
const data = ref({
  name: null,
  id: null,
}) // Данные формы

/** 
* Данные валидации
* @member {Boolean} name - Валидация наименования
*/
const isValid = ref({
  name: false,
  result: false
})

const isLoad = ref(false) // Статус загрузки данных
const store = useTypeDocsStore() // Создание нового стора
const id = ref(props.modelValue.id) // Идентификатор записи

onMounted(async () => {
  const response = await store.getRecord(id.value)
  isLoad.value = true
  data.value.id = id
  data.value.name = response.value.name
})


/**
* Наблюдатель для установки валидации
*/
watch(data.value, (newVal: Data) => {
  isValid.value.name = !!(newVal.name && newVal.name.length && newVal.name.length > 3) // Установка валидации для поля "Наименование"
  isValid.value.result = getValidForm(isValid.value)
  emit('valid', {save: !isValid.value.result})
  emit('data', data.value)
})

</script>~/stores/default~/stores-old/type-docs-store