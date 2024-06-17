<template>
  <div class="flex justify-center flex-col items-center">
    <FileUpload
      mode="basic"
      accept="image/*"
      v-if="!image"
      :maxFileSize="1000000"
      chooseLabel="Загрузить изображения"
      @select="onFileSelect"
    />
    <Button v-if="image && isNew" severity="success" label="Загрузить" icon="pi pi-upload" @click="onUpload" />
    <Image  :src="image" alt="" class="w-[70%] border mt-2" v-if="image" />
  </div>
</template>

<script lang="ts" setup>
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

const isNew = ref(false) // Признак нового изображения
const list = ref([]) // Список изображений
const image = ref(null) // Данные изображения
const dataNewImage = ref({}) //

/**
 ** Событие при выборе изображения
 * @function onFileSelect
 * @param {any} event
 */
const onFileSelect = async (event: any) => {
  if (event && event.files && event.files.length > 0) {
    image.value = await readFileAsync(event.files[0])
    dataNewImage.value = event.files[0]
    isNew.value = true
  }
}

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
** Загрузка изображения
* @function onUpload
* @param {any} event
*/
const onUpload = async (event: any) => {
  
}
</script>
