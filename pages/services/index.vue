<!-- Форма "Сервисы" -->

<template>
  <div class="w-full h-full max-h-full shadow-xl surface-0 p-1">
    <div class="border-b border-l border-r pl-2 pt-2 shadow-xl surface-0 bg-blue-50" id="title" ref="title">
      <h5>Сервисы</h5>
    </div>
    <div class="p-2 flex flex-row w-full shadow-xl border-2">
      <div class="flex-1 w-6">
        <Button @click="onAdd">Создать</Button>
        <Button @click="onEdit" class="ml-2" severity="success" :disabled="disabled">Изменить</Button>
      </div>
      <div class="pr-2">
        <Button severity="danger" :disabled="disabled">Удалить</Button>
      </div>

    </div>
    <div class="pt-1 shadow-xl" v-if="!isLoading">
      <div>
        <DataTable :value="list" scrollable :scrollHeight="tableHeight" resizableColumns columnResizeMode="fit" showGridlines v-model:selection="selectItem"
          size="small" dataKey="srvcs_id" selectionMode="single" @click="" ref="table">
          <Column field="srvcs_id" header="Идентификатор" class="w-[8%]" />
          <Column field="srvcs_name" header="Наименование" class="w-[83%]" />
          <Column header="Дата создания">
            <template #body="{ data }">
              {{ moment(data.srvcs_created_date).format('YYYY.MM.DD HH:mm:ss') }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div ref="blockPagination">
        <Paginator :rows="limit" :totalRecords="count" ref="pagination" />
      </div>

    </div>

  </div>
  <DynamicDialog />
</template>

<script lang="ts" setup>
interface Title {
  offsetHeight: number
}

import { Service } from '~/types/service'
import { DynamicDialogOptions, DynamicDialogCloseOptions } from 'primevue/dynamicdialogoptions/DynamicDialogOptions'
import moment from 'moment'
import { useStoreServices } from '~/stores/services.store'

const storeServices = useStoreServices() // Создание стора
const editModal = defineAsyncComponent(() => import('./edit.vue'));

const dialog = useDialog() // Модуль диалогов
const table: object = ref() // Ссылка на таблицу
const pagination = ref() // Идентификатор элемента пагинации
const selectItem: Ref<Service | null> = ref(null) // Выделенный элемент
const list: Ref<Service[]> = ref([]) // Список сервисов
const valuePagination: number | any = computed(() => pagination.value?.page || 0) // Получение значения пагинации
const tableHeight = ref() // Высота таблицы
const title: Ref<Title | null> = ref(null) // Элемент заголовок страницы
const blockPagination = ref() // Родительский элемент пагинации
const limit: Ref<number> = ref(0) // Лимит записей на вкладке пагинации
const count: Ref<number> = ref(0) // Количество записей

/** 
** Вычисление статуса загрузки данных таблицы
* @function isLoading
*/
const isLoading: ComputedRef<boolean> = computed(() => storeServices.isLoading) // Вычисление значения загрузки данных

/** 
** Получение списка "Сервисы"
* @async
* @function updateList
*/
const updateList: () => Promise<void> = async () => {
  await nextTick() // Ожидание загрузки DOM
  await storeServices.getCount() // Получение количества записей
  count.value = storeServices.count // Присвоение количества записей

  await storeServices.getList() // Получение списка
  list.value = storeServices.list // Присвоение списка

  limit.value = storeServices.limit // Присвоение лимита записей
}


/** 
** Вычисление активности кнопки "Изменить" и "Удалить"
** Если строка не выбрана, то кнопка не активна
* @function disabled
*/
const disabled: ComputedRef<boolean> = computed(() => !selectItem.value)

/** 
** Получение значения высоты таблицы
* @function heightTable
*/
const heightTable = () => `${window.innerHeight - (title.value ? title.value?.offsetHeight : 100) - blockPagination.value.offsetHeight - (window.innerHeight > 400 && window.innerWidth > 500 ? 72 : 64)}px` // Вычисление высоты таблицы

/** 
** Вычисление высоты таблицы
* @function getSizeTable
*/
const getSizeTable = () => {
  tableHeight.value = heightTable() // Вычисление высоты таблицы
  window.addEventListener("resize", () => {
    tableHeight.value = heightTable() // Вычисление высоты таблицы
  })
}

onMounted(async () => {
  await updateList()
  if(!isLoading.value) {
    getSizeTable() // Вычисление высоты таблицы   
  }
})

/** 
** Добавление нового сервиса
** Открывается модальное окно для добавления
* @function onAdd
*/
const onAdd = async () => {
  const options: DynamicDialogOptions = {
    props: {
      header: 'Создать новый сервис',
      draggable: true, // Разрешить перетаскивание
      position: 'right', // Положение формы
      style: {
        height: '100%',
        width: '30%',
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '100vw'
      },
      modal: true
    },
    onClose: async (args: any) => {
      await updateList()
      selectItem.value = list.value[0] // Выделение созданного элемента(находится первый в списке)
    },
    data: {
      type: 'create' // Тип модального окна
    }
  } // Параметры модального окна
  dialog.open(editModal, options) // Открытие модельного окна для добавления нового сервиса
}

/** 
** Редактирование сервиса
* @function onEdit
*/
const onEdit = async () => {
  const options: DynamicDialogOptions = {
    props: {
      header: 'Редактирование сервиса',
      draggable: true,
      position: 'right',
      style: {
        height: '100%',
        width: '30%',
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '100vw'
      },
      modal: true
    },
    onClose: async (args: any) => {
      await updateList()
      selectItem.value = list.value[0] // Выделение созданного элемента(находится первый в списке)
    },
    data: {
      type: 'edit', // Тип модального окна
      item: selectItem.value
    }
  }
  dialog.open(editModal, options) // Открытие модельного окна для добавления нового сервиса
}

</script>
