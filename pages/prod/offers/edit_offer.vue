<template>
  <app-spinner class="w-full" v-if="!isLoad" />
  <div class="shadow-md shadow-zinc-300 p-2 rounded-lg border">
    <div ref="tabs" class="tabs tabs-boxed shadow-md shadow-zinc-300 rounded-lg border">
      <a class="tab text-black active" @click="selectTab('desc', $event)" text-black>Описание</a>
      <a class="tab text-black" @click="selectTab('info', $event)">Информация</a>
    </div>
  </div>

  <div v-show="tabsShow.desc">
    <div class="flex-row mt-2 border p-2 shadow-md shadow-zinc-300 rounded-lg">
      <app-input :is-valid="isValid.name" class="standart w-full input" label="Наименование" v-model="data.name" />
    </div>
    <div class="flex-row mt-2 border p-2 shadow-md shadow-zinc-300 rounded-lg">
      <div class="text-center flex-col justify-center">
        <h5 class="w-full">Главный банер</h5>
        <div class="w-full justify-center flex">
          <div class="h-[150px] w-[150px]" v-if="mainImage?.path">
            <nuxt-img :src="mainImage?.path" format="webp" v-if="mainImage?.path" />
          </div>
          <div v-else>
            <span>Изображение не установлено</span>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <app-button @click="controlImage" class="btn-primary btn-sm ring ring-blue-100 text-slate-100">Изображения</app-button>
      </div>
    </div>
    <div class="flex-row mt-2 border p-2 shadow-md shadow-zinc-300 rounded-lg">
      <app-textarea class="h-[80px]" label="Короткое описание" v-model="data.information.short_description" />
      <app-textarea class="h-[300px]" label="Полное описание" v-model="data.information.description" />
    </div>
  </div>

  <div class="shadow-md shadow-zinc-300 p-2 rounded-lg border mt-2 flex" v-show="tabsShow.info">
    <div class="flex w-full flex-col text-center">
      <div>
        <h5>Сумма</h5>
      </div>
      <div class="flex">
        <app-input class="input-sm w-full" label="Мин." v-model="data.information.sum_start" />
        <app-input class="input-sm w-full" label="Макс." v-model="data.information.sum_end" />
      </div>
    </div>
  </div>

  <div class="shadow-md shadow-zinc-300 p-2 rounded-lg border mt-2 flex" v-show="tabsShow.info">
    <div class="flex w-full flex-col text-center">
      <div>
        <h5>Периоды</h5>
      </div>


      <div class="border p-2 rounded-lg shadow-md shadow-zinc-300">
        <div class="flex flex-row ">
          <span class="text-center w-full">Минимальный</span>
        </div>
        <div class="flex">
          <div class="w-full">
            <app-input class="input input-sm w-full" label="Значение" v-model="data.information.period_min" />
          </div>
          <div class="w-full">
            <app-select select-class="select-sm w-[calc(100%-2%)]" label="Тип периода" class="w-full pt-2" v-model="data.information.type_period_min" spinner-class="pt-4" />
          </div>
        </div>
      </div>

      <div class="border p-2 rounded-lg mt-3 shadow-md shadow-zinc-300">
        <div class="flex flex-row ">
          <span class="text-center w-full">Максимальный</span>
        </div>
        <div class="flex">
          <div class="w-full">
            <app-input class="input input-sm w-full" label="Значение" v-model="data.information.period_max" />
          </div>
          <div class="w-full">
            <app-select select-class="select-sm w-[calc(100%-2%)]" label="Тип периода" class="w-full pt-2" v-model="data.information.type_period_max" spinner-class="pt-4" />
          </div>
        </div>
      </div>

      <div class="border p-2 rounded-lg mt-3 shadow-md shadow-zinc-300">
        <div class="flex flex-row ">
          <span class="text-center w-full">Беспроцентный</span>
        </div>
        <div class="flex">
          <div class="w-full">
            <app-input class="input input-sm w-full" label="Значение" v-model="data.information.free_period" />
          </div>
          <div class="w-full">
            <app-select select-class="select-sm w-[calc(100%-2%)]" label="Тип периода" class="w-full pt-2" v-model="data.information.type_free_period" spinner-class="pt-4"
              value="value" />
          </div>
        </div>
      </div>

      <div class="border p-2 rounded-lg mt-3 shadow-md shadow-zinc-300">
        <div class="flex flex-row ">
          <span class="text-center w-full">Время рассмотрения заявки</span>
        </div>
        <div class="flex">
          <div class="w-full">
            <app-input class="input input-sm w-full" label="Значение" v-model="data.information.review_time" />
          </div>
          <div class="w-full">
            <app-select select-class="select-sm w-[calc(100%-2%)]" label="Тип периода" class="w-full pt-2" v-model="data.information.type_review_time" spinner-class="pt-4"
              value="value" />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { useOffersStore, Offer } from '~/stores/offers-store'
const emit = defineEmits(['valid', 'data'])
const tabs = ref() // Идентификатор вкладок
const tabsShow: any = ref({
  desc: true,
  info: false
})


/** 
* @type Props
* @param {Object} modelValue - Данные формы
*/
type Props = {
  modelValue?: any
}

/** Установка значений по умолчанию для данных формы */
const dataDefault: Offer = {
  id: null,
  name: '',
  information: {
    description: null,
    short_description: null,
    sum_start: null,
    sum_end: null,
    free_period: null,
    type_free_period: null,
    period_min: null,
    type_period_min: null,
    period_max: null,
    type_period_max: null,
    review_time: null,
    type_review_time: null
  },
  status: false,
  id_cpa: null,
  id_organization: null,
  images: []
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
const store = useOffersStore() // Создание нового стора
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

/** 
** При клике на кладку
* @function selectTab
*/
function selectTab(name: string, event: any) {
  tabs.value.querySelectorAll('a').forEach((el: any) => el.classList.remove('active'))
  event.target.classList.add('active')
  for(let key in tabsShow.value)
    tabsShow.value[key] = false
  tabsShow.value[name] = true

}
</script>
~/stores-old/offers-store