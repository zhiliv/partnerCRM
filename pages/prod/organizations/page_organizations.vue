<template>
  <div class="w-full h-full max-h-full">
    <div>
      <app-control-record ref="control" @on-new="onNew" modal-title-new="Создание новой организации" modal-title-edit="Редактирование организации"
        modal-width-new="30%" :p-select-item="selectItem" @on-edit="onEdit" @on-delete="onDelete" :uniq="true" name-edit-form="edit_organization" />
    </div>
    <div class="min-h-full">
      <app-table ref="table" :store="store" :columns="columnsTable" @click="(data) => selectItem = data" @dblclick="onDblEdit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useOrganizationsStore } from '~/stores/organizations-store'


const meta = { title: 'Организации' } // Установка мета данных страницы
useSeoMeta(meta) // Установка заголовка
const selectItem = ref() // Данные о выбранной записи
const table = ref() // Ссылка на элемент таблицы
const control = ref() // Ссылка на кнопки управления
const store = useOrganizationsStore() // Создание нового стора


const columnsTable = [
  {
    key: `${organizations_schema.short}_id`,
    label: 'Идентификатор',
    width: '200px',
    textPosition: 'center',
    labelPosition: 'center',
    filter: 'number'
  },
  { key: `${organizations_schema.short}_name`, label: 'Наименование', filter: 'text', witdh: '300px' },
  { key: `${organizations_schema.short}_short_description`, label: 'Короткое описание', filter: 'text' },
  { key: `${organizations_schema.short}_information_site`, label: 'Адрес сайта', filter: 'text', width: '300px' },
  { key: `${organizations_schema.short}_is_main_img`, label: 'Наличие главного изображения', width: '150px'}
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
  const result: any = await store.deleteRecord({ id: selectItem.value.id, _url: '/categories' })
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
</script>~/stores-old/organizations-store