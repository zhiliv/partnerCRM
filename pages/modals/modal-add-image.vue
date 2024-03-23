<template>
  <div class="col-span-12 mx-4">
    <app-input
      :is-valid="isValid.label"
      class="standart input-bordered w-full input"
      label="Описание изображения"
      v-model.trim="data.label"
    />
    <app-img-upload @file="onFile" />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['valid', 'data']) // Отправляемые события

type File = {
  label: string | null
  lastModified: string | null
  lastModifiedDate: string | null
  name: string | null
  size: number | null
  type: string | null
  webkitRelativePath: string | null
  dataFile: string | null
}

/** 
** Данные формы
* @type Data
* @param {String} label - Наименование
* @param {String} name - Имя файла
* @param {String} dataFile - Содержимое изображения в бинарном формате
* @param {Number} lastModified - Дата\Время в секундах последней модификации
* @param {Date} lastModifiedDate - Дата модификации файла
* @param {Number} size - Размер файла
* @param {String} type - Тип файла
* @param {String} webkitRelativePath - Путь к папке для выбора всех изображений
*/
type Data = {
  file: File | null
  label: string | null
  fileName: string | null
  dataFile: string | Blob | null
}

/** 
** Данные валидации
* @type IsValid
* @param {Boolean} label - Валидация поля "Описание изображения"
* @param {Boolean} filename - Валидация имени файла
* @param {Boolean} dataFile - Валидация содержимого файла
* @param {Boolean} result - Значение валидации формы 
*/
type IsValid = {
  label: boolean
  file: boolean
  result: boolean
}

/** Установка данных формы по умолчанию  */
const dataDefault: Data = {
  file: null,
  label: null,
  fileName: null,
  dataFile: null
}
const data = ref(dataDefault)

/** Установка значения по умолчанию для валидации */
const isValidDefault: IsValid = {
  label: false,
  file: false,
  result: false
}
const isValid = ref(isValidDefault)

emit('valid', { add: !isValid.value.result })

/**
** Получение данных о файле
* @function readFileAsync
* @param {Object} file - Файл
*/
const readFileAsync: any = (file: File | any) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/** 
** Событие при выборе файла
* @function onFile
* @param {Object} file - Данные файла
*/
async function onFile(file: File) {
  data.value.file = file
  data.value.fileName = file.name
  data.value.dataFile = await readFileAsync(file)
  emit('data', data.value)
}

/** Наблюдатель для установки валидации */
watch(data.value, async (newVal: Data) => {
  isValid.value.label = Boolean(newVal.label && newVal.label.length && newVal.label.length > 3) // Установка валидации для поля "Описание файла"
  isValid.value.file = !!data.value.file?.name
  // isValid.value.dataFile = !!await readFileAsync(data.value)
  isValid.value.result = getValidForm(isValid.value)
  emit('valid', { add: !isValid.value.result })
  emit('data', data.value)
})

</script>