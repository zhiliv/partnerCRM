<template>
  <div class="col-span-12 mx-4">
    <app-input v-model.trim="data.name" class="standart input-bordered w-full input" :is-valid="isValid.name" label="Наименование" />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['valid', 'data'])
/** 
* Данные формы
* @constant data
* @member {String} name - Наименование
*/
const data = ref({
  name: ''
})

/** 
* Данные валидации
* @member {Boolean} name - Валидация наименования
*/
const isValid = ref({
  name: false,
  result: false
})

/**
* Наблюдатель для установки валидации
*/
watch(data.value, (newVal) => {
  isValid.value.name = Boolean(newVal.name && newVal.name.length && newVal.name.length > 3) // Установка валидации для поля "Наименование"
  isValid.value.result = getValidForm(isValid.value)
  emit('valid', { new: !isValid.value.result })
  emit('data', data.value)
})

</script>