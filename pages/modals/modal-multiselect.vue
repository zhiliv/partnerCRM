<template>
  <div class="modal-multiselect-mask w-full h-full" v-show="isShow">
    <div class="modal-multiselect-wrapper w-full">
      <div class="modal-multiselect-container border-2 border-zinc-500 w-full">
        <div class="body-multiselect-modal bg-zinc-600 w-full">
          <div class="h-auto bg-zinc-700 p-1 border-b-2 border-zinc-500 w-full flex">
            <div class="w-full text-center">
              <h4 class="text-amber-600 align-content-start">{{title}}</h4>
            </div>
            <app-button class="btn-sm btn-square align-content-end" @click="onCancel">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </app-button>
          </div>
          <div class="p-3 flex flex-col lg:flex-row max-h-[300px] overflow-y-scroll">
            <div class="form-control w-full">
              <label class="cursor-pointer label flex justify-end">
                <input type="checkbox" v-model="selectAll" class="checkbox checkbox-warning" />
                <span class="label-text px-2">{{selectAll ? 'Отменить выбор всех' : 'Выбрать все'}}</span>
              </label>
              <label
                class="cursor-pointer label flex justify-start"
                v-for="item in list"
                :key="item.id"
              >
                <input
                  type="checkbox"
                  :value="item[key]"
                  v-model="valueModel"
                  class="checkbox checkbox-warning"
                />
                <span class="label-text px-2">{{item[text]}}</span>
              </label>
            </div>
          </div>
          <div class="flex justify-between border-t">
            <app-button class="m-2 btn-error" @click="onCancel">Отменить</app-button>
            <app-button class="m-2 btn-success" @click="onSelect">Выбрать</app-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false, // отключение наследования аттрибутов

  data() {
    return {
      title: 'Выберите значения из списка', // заголовок формы
      isShow: false, // статус отображения формы
      list: [],
      key: 'id', // Наименование ключа с содержимым
      text: 'name', // Свойство для отображения текста
      valueModel: [],
      selectAll: false,
    }
  },

  methods: {
    /*
    * Закрытие формы
    @ function onCancel
    */
    onCancel() {
      const { $event } = this
      $event(`close-multiselect`, false) // Событие при подтверждении1
      this.isShow = false // скрытие окна
    },

    /*
     * Завершить выбор, вернуть результат
     * @unction onSave
     */
    onSelect() {
      const result = []
      const { valueModel, $event } = this
      for (const key in valueModel) result.push(valueModel[key]) // обработка объекта и добавление выбранных значений в массив
      $event('close-multiselect', result) // отправка результата
      this.isShow = false // скрытие окна
    },
  },

  mounted() {
    const { $listen } = this
    $listen('show-multiselect', event => {
      // Прослушивание события открытия окна
      this.title = event.title // установка заголовка формы
      if (event.key) this.key = event.key // установка ключа
      if (event.text) this.key = event.text // установка свойства текстового отображения
      this.list = event.list // установка списка
      if(event.selected && event.selected.length) this.valueModel = event.selected // установка значения активных чекбоксов
      this.isShow = true // установка статуса показа окна
    })
  },

  watch: {
    /* Отслеживание значений чекбокса "Выбрать все"
     * @function selectAll
     * @param {Boolean} newValue - Новое значение
     */
    selectAll(newValue) {
      const { list, key } = this
      if (newValue) {
        this.valueModel = []
        this.valueModel = list.map(el => el[key])
      } else this.valueModel = []
    },
  },
}
</script>
<style>
  .modal-multiselect-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: table;
  }

  .modal-multiselect-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-multiselect-container {
    width: 20%;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    font-family: Helvetica, Arial, sans-serif;
    padding-bottom: 0px;
  }

  @media (max-width: 767.9px) {
    .modal-multiselect-container {
      width: 100%;
    }
  }
</style>