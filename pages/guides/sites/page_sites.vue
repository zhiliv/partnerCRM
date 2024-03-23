<template>
  <div class="w-full h-full max-h-full">
    <div>
      <app-control-record
        :p-select-item="selectItem"
        :uniq="true"
        @on-delete="onDelete"
        @on-edit="onEdit"
        @on-new="onNew"
        modal-title-edit="Редактирование сайта"
        modal-title-new="Создание нового сайта"
        modal-width-new="30%"
        name-edit-form="edit_site"
        ref="control"
      />
    </div>
    <div class="min-h-full">
      <app-table
        :columns="columns"
        :store="store"
        @click="(data) => selectItem = data"
        @dblclick="onDblEdit"
        ref="table"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSitesStore } from '~/stores/sites-store'

const meta = { title: 'Сайты' } // Установка мета данных страницы
useSeoMeta(meta) // Установка заголовка
const selectItem = ref() // Данные о выбранной записи
const table = ref() // Ссылка на элемент таблицы
const control = ref() // Ссылка на кнопки управления
const store = useSitesStore() // Создание нового стора

const columns = [
  {
    key: 'id',
    label: 'Идентификатор',
    width: '200px',
    textPosition: 'center',
    labelPosition: 'center',
    filter: 'number'
  },
  { key: 'name', label: 'Наименование', filter: 'text' }
]

/**  
* Добавление новой записи
* @function onNew
* @param {Object} data - Данные для добавления
*/
async function onNew(data: any) {
  data.uniq = true // Установка признака уникальности наименования
  const result: any = await store.addNewRecord(data)
  if(result?.value) {
    showToast({ message: result?.value?.message, type: result?.value?.typeMessage }) // Отображение сообщения об успешном добавлении
    table.value.columns[0].filterValue = result.value.data.id // Установка значения для идентификатора
    await table.value.applyFilter('id', result.value.data.id, '=') // Применение фильтра
    table.value.table.querySelector('.row-table').click()
    control.value.setSelectItem(store.list[0])
    onDblEdit()
  }
}

/** 
 * Редактирование записи
* @function onEdit
* @param {Object} data - Данные для редактирования
*/
async function onEdit(data: any) {
  const result: any = await store.editRecord(data)
  if(result?.value)
    showToast({ message: result?.value?.message, type: result?.value?.typeMessage }) // Отображение сообщения об успешном обновлении записи
}

/** 
 * Удаление записи
* @function onDelete
*/
async function onDelete() {
  const result: any = await store.deleteRecord({ id: selectItem.value.id, _url: '/sites' })
  if(result?.value)
    showToast({ message: result?.value?.message, type: result?.value?.typeMessage }) // Отображение сообщения об успешном удалении записи
}

/** 
* Редактирование записи при двойном клике
* @function onDblEdit
* @param {Object} data - Данные для открытия формы
*/
function onDblEdit(data?: any) {
  control.value.onEdit(data)
}
</script>~/stores-old/sites-store