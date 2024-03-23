<template>
  <div class="grid grid-cols-12 min-h-full">
    <div class="col-span-12 flex justify-center">
      <input
        ref="file"
        type="file"
        class="file-input file-input-bordered file-input-primary w-full max-w-xs my-4"
        @change="onFileChanged($event)" />
    </div>
  </div>
  <div class="p-3 flex flex-col lg:flex-row justify-between items-center h-full">
    <app-button class="btn-error w-full lg:btn-wide m-2" @click="onCancel">Отменить</app-button>
    <app-button class="btn-success w-full lg:btn-wide m-2" @click="onUpload" :disabled="disabledLoad">Загрузить</app-button>
  </div>
</template>

<script>
import mixinFunction from '~/mixins/globalMixins'
export default {
  mixins: [mixinFunction],
  inheritAttrs: false, // отключение наследования аттрибутов

  props: {
    /* Входные данные формы */
    inputData: {
      // входные данные
      type: Object,
      default: {},
    },
  },

  data() {
    return {
      disabledLoad: true, // активность кнопки "Загрузить"
      formData: null, // загружаемый файл
      file: null, // данные о файле
    }
  },

  methods: {
    /*
     * При выборе файла
     * @function onFileChanged
     * @param {Object} event - Данные события
     */
    onFileChanged(event) {
      this.formData = new FormData() // создание объекта данных формы
      this.file = event.target.files[0] // получение данных файла
      this.formData.append('file', this.file) // добавление в объект данных формы информации о файле
    },

    /*
     *  @function  onUpload
     */
    async onUpload() {
      const { $event, inputData, formData, processResponse } = this
      const paramsQuery = { method: 'POST', body: formData } // параметры запроса
      const response = await useFetch(inputData.url, paramsQuery) // получение данных списка
      if(processResponse(response)){
        $event(`close-modal-${inputData.formUuid}`, {path: response.data.value.path ? response.data.value.path : null}) // открытие модальной формы
      }

    },

    /*
     * События нажатия кнопки "Отмена"
     */
    onCancel() {
      const { inputData } = this
      this.$event(`destroy-modal-${inputData.formUuid}`) // отправка события для для закрытия формы
    },
  },

  watch: {
    /*
     * Отслеживание изменения данных файла
     * Установка активности кнопки "Загрузить"
     */
    file: {
      handler(newValue) {
        this.disabledLoad = newValue && newValue.name ? false : true
      },
      deep: true,
    },
  },
}
</script>
