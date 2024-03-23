<template>
  <template
    :key="modal.formUuid"
    v-for="modal in modals"
  >
    <div
      class="modal-mask select-none"
      v-show="modal.isShow && modal.form"
    >
      <div :class="{ 'modal-wrapper': !modal.isDrawer }">
        <div
          :class="{ 'right-0': modal?.isDrawer && modal?.position === 'right', 'left-0': modal?.position === 'left', 'absolute': modal.isDrawer, 'h-full': modal.isDrawer , 'border-l-4': modal.isDrawer}"
          :style="{ width: modal.data.options?.width || '50%' }"
          class="modal-container border-2 border-zinc-600"
        >
          <div class="body-modal max-h-full">
            <div class="p-1 border-b mb-2 text-center bg-neutral-100">
              <span class="text-lg px-4">{{ modal.title }}</span>
            </div>
            <div
              class="overflow-y-auto pb-4 pl-2 pr-2 min-h-[60px]"
              ref="subForm"
            >
              <component
                :is="modal.form"
                @data="getData"
                @valid="getValid"
                v-model="modal.valueModel"
              />
            </div>
          </div>
          <div
            :class="{ 'h-15': modal.isDrawer, 'h-16': !modal.isDrawer }"
            class="bottom-0 p-2 w-full border-t-2 border-neutral-400 bg-neutral-100"
          >
            <app-button
              @click="close"
              class="m-1 standart btn-sm btn-error text-slate-100 ring ring-red-100 hover:bg-rose-700"
              v-if="modal.buttons.cancel"
            >Отменить</app-button>
            <app-button
              :disabled="disabled.save"
              @click="onSave"
              :class="{ring: !disabled.save, 'ring-green-100': !disabled.save}"
              class="btn-success m-1 standart btn-sm float-right text-slate-100 hover:bg-green-700"
              v-if="modal.buttons.save"
            >Сохранить</app-button>
            <app-button
              :disabled="disabled.add"
              @click="onAdd"
              class="btn-primary m-1 standart btn-sm float-right text-slate-100"
              v-if="modal.buttons.add"
            >Добавить</app-button>
            <app-button
              @click="close"
              class="w-20 m-1 standart btn-sm btn-error"
              v-if="modal.buttons.no"
            >Нет</app-button>
            <app-button
              @click="onYes"
              class="w-20 btn-success m-1 standart btn-sm float-right text-slate-100"
              v-if="modal.buttons.yes"
            >Да</app-button>
            <app-button
              @click="onSave"
              class="w-25 btn-success m-1 standart btn-sm float-right text-slate-100"
              v-if="modal.buttons.change"
            >Изменить</app-button>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
<script lang="ts" setup>
import { listComponents } from './async-list-components'
const modals: any = ref([]) // Массив с модальными окнами
const data = ref() // Полученные данные формы
const disabled = ref({
  save: true,
  cancel: false,
  add: false
})
const components: any = reactive(listComponents) // Компоненты, которые можно выводить в дровер
const buttons = ref({
  save: false, // Кнопка "Сохранить"
  close: false, // Кнопка "Закрыть"
  cancel: true, // Кнопка Отменить
  new: false, // Кнопка "Создать" 
  yes: false, // Кнопка "Да"
  no: false, // Кнопка "Нет"
  add: false, // Кнопка  "Добавить"
  change: false // Кнопка "Изменить"
}) // Список кнопок в футере формы
const subForm = ref() // Тело модального окна

/** Прием события для показа формы  */
emitter.on('show-modal', (event: any) => {
  const btns = setButtons(event.options?.buttons)
  const modal: any = {
    data: event,
    buttons: btns,
    formUuid: event.formUuid,
    form: components[event.form],
    isDrawer: event.options?.isDrawer,
    text: event.options.text,
    isShow: true, // Отображение модальной формы
    title: event.options?.title,
    position: event.options?.position || 'right',
    valueModel: event.valueModel || event
  }
  modals.value.push(modal)
  /** Прием события для уничтожения формы  */
  emitter.on(`destroy-modal-${event.formUuid}`, () => {
    modals.value.pop()
  })
})

/** 
** Установка доступности кнопок
* @function setButtons
* @param {Object} _buttons - Список кнопок 
*/
const setButtons = (_buttons: any) => {
  const btns = {
    save: _buttons?.save ? _buttons?.save : false, // Кнопка "Сохранить"
    close: false, // Кнопка "Закрыть"
    cancel: _buttons?.cancel ? _buttons?.cancel : false, // Кнопка Отменить
    new: false, // Кнопка "Создать" 
    yes: _buttons?.yes ? _buttons?.yes : false, // Кнопка "Да"
    no: _buttons?.no ? _buttons?.no : false, // Кнопка "Нет"
    add: _buttons?.add ? _buttons?.add : false, // Кнопка  "Добавить"  
    change: _buttons?.change ? _buttons?.change : false // Кнопка  "Добавить"  
  }
  return btns
}

/** 
** Закрытие модального окна
* @function close
*/
function close(_data?: any) {
  emitter.emit(`close-modal-${modals.value[modals.value.length - 1].formUuid}`, _data?.value || null) // отправка события для для закрытия формы
}

/** 
** Получение значения валидации
* @function g etValid
*/
function getValid(valid: any) {
  disabled.value.save = valid.save
  disabled.value.add = valid.add
}

/** 
** Получение данных с дочерней формы
* @function getData
* @param {Objet} _data - Полученные данные 
*/
function getData(_data: any) {
  data.value = _data
}

/** 
** Событие при нажатии на кнопку "Сохранить"
* @function onSave
*/
function onSave() {
  close(data)
}

/** 
** Событие при нажатии на кнопку "Добавить"
* @function onAdd
*/
function onAdd() {
  close(data)
}

/** 
** Событие при нажатии на кнопку "Да"
* @function onYes
*/
function onYes() {
  const data = { value: true }
  close(data)

}

/** 
** При обновлении формы 
*/
onUpdated(() => {
  subForm.value.forEach((el: HTMLElement) => el.style.height = 'auto')
  modals.value.forEach((el: any) => {
    if(el.isDrawer === true) {
      subForm.value.forEach((el: any) => {
        el.style.height = el.parentNode.parentNode.offsetHeight - 110 + 'px'
        window.addEventListener("resize", () => { // отслеживание изменений размера окна
          el.style.height = el.parentNode.parentNode.offsetHeight - 110 + 'px' // Получение высоты родителя и 
        })
      })
    }
  })
})
</script>

<style>
  .modal-mask {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: table;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    padding: 3%;
  }

  .modal-container {
    margin: 0px auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    font-family: Helvetica, Arial, sans-serif;
    padding-bottom: 0px;
  }

  @media (max-width: 767.9px) {
    .modal-container {
      width: 100%;
    }
  }

  @media (max-width: 1200px) {
    .modal-container {
      width: 98% !important;
    }
  }

  @media (max-width: 1200px) {
    .drawer-modal {
      width: 100% !important;
    }
  }
</style>