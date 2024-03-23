<template>
  <app-spinner
    class="w-full"
    v-if="!isLoad"
  />
  <div class="shadow-md shadow-zinc-300 p-2 rounded-lg border">
    <app-input
      :is-valid="isValid.name"
      class="standart w-full input"
      label="Наименование"
      v-model="data.name"
    />
  </div>
  <div class="flex-row mt-2 shadow-md shadow-zinc-300 p-2 rounded-lg border">
    <div class="text-center flex-col justify-center">
      <h5 class="w-full">Главный банер</h5>
      <div class="w-full justify-center flex">
        <div class="h-[150px] w-[150px]" v-if="mainImage?.path">
          <nuxt-img
            :src="mainImage?.path"
            format="webp"
            v-if="mainImage?.path"
          />
        </div>
        <div v-else>
          <span>Изображение не установлено</span>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <app-button
        @click="controlImage"
        class="btn-primary btn-sm ring ring-blue-100 text-slate-100"
      >Изображения</app-button>
    </div>
  </div>
  <div class="shadow-md shadow-zinc-300 p-2 rounded-lg border mt-2">
    <app-input
      class="standart w-full input"
      label="Юридическое наименование"
      v-model="data.information.Ur_name"
    />
    <app-input
      class="standart w-full input"
      label="Юридический адрес"
      v-model="data.information.Ur_address"
    />
    <app-input
      class="standart w-full input"
      label="Сайт"
      v-model="data.information.site"
    />
    <app-input
      class="standart w-full input"
      label="ИНН"
      v-model="data.information.INN"
    />
    <app-input
      class="standart w-full input"
      label="ОГРН"
      v-model="data.information.OGRN"
    />
    <app-input
      class="standart w-full input"
      label="Номера телефонов"
      v-model="data.information.phones"
    />
    <app-textarea
      class="h-[80px]"
      label="Короткое описание"
      v-model="data.information.short_description"
    />
    <app-textarea
      class="h-[300px]"
      label="Полное описание"
      v-model="data.information.description"
    />
  </div>
</template>

<script lang="ts" setup>
import { useOrganizationsStore, Organization } from '~/stores/organizations-store'
const emit = defineEmits(['valid', 'data'])

/** 
* @type Props
* @param {Object} modelValue - Данные формы
*/
type Props = {
  modelValue?: any
}

/** Установка значений по умолчанию для данных формы */
const dataDefault: Organization = {
  name: '',
  information: {
    Ur_name: null,
    Ur_address: null,
    description: null,
    short_description: null,
    site: null,
    INN: null,
    OGRN: null,
    phones: null
  },
  images: [],
  id: null
}

/** Установка значений по умолчанию для входных параметров  */
const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
})

const data = ref(dataDefault) // Данные формы

/** 
** Данные валидации
* @member {Boolean} name - Валидация наименования
* @member {Boolean} description - Валидация описания
*/
const isValid = ref({
  name: false,
  result: false
})

const isLoad = ref(false) // Статус загрузки данных
const store = useOrganizationsStore() // Создание нового стора
const id = ref(props.modelValue.id) // Идентификатор записи

onMounted(async () => {
  const response = await store.getRecord(id.value)
  isLoad.value = true
  data.value.id = id
  data.value.name = response.value.name
  data.value.images = response.value.images || []
  if(response.value.information)
    data.value.information = response.value.information
})


/**  Наблюдатель для установки валидации */
watch(data.value, (newVal: any) => {
  isValid.value.name = !!(newVal.name && newVal.name.length && newVal.name.length > 3) // Установка валидации для поля "Наименование"
  /* Установка валидации для поля "Описание" */
  isValid.value.result = getValidForm(isValid.value)
  emit('valid', { save: !isValid.value.result })
  emit('data', data.value)
})

/** 
** Загрузка изображения
* @function addImage
* @param {Object}  dataFile - Данные о загружаемом файле
*/
async function addImage(dataFile: any) {
  if(dataFile) {
    dataFile.isNew = true
    data.value.images.push(dataFile)
  }
}

/** 
** Управление изображениями
* @function controlImage
*/
async function controlImage() {
  const body: any = await showModal('control_image', {
    options: {
      title: 'Управление изображениями',
      width: '30%',
      isDrawer: true,
      buttons: { change: true, cancel: true }
    },
    images: data.value.images
  }) // Получение ответа из модального окна
  if(body) {
    console.log('🚀 -> controlImage -> body:', body)
    //  emit('add', body)
  }
}

const mainImage: any = computed(() => {
  const index = data.value.images.findIndex((el: any) => el.isActive)
  return index !== -1 ? data.value.images[index] : {}
})
</script>~/stores-old/organizations-store