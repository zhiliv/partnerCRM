<template>
  <div class="w-full h-full max-h-full shadow-xl surface-0 p-1">
    <div class="border-b border-l border-r pl-2 pt-2 shadow-xl surface-0 bg-blue-50" id="title" ref="titleBlock">
      <h5>Сервисы</h5>
    </div>
    <div class="p-2 flex flex-row w-full shadow-xl border-2">
      <div class="flex-1 w-6">
        <Button @click="onCreate" size="small">Создать</Button>
        <Button @click="onEdit" class="ml-2" severity="success" :disabled="disabled" size="small">Изменить</Button>
      </div>
      <div class="pr-2">
        <Button severity="danger" :disabled="disabled" @click="onDelete" size="small">Удалить</Button>
      </div>
    </div>
    <div class="pt-1 shadow-xl">
      <div>
        <DataTable :value="storeServices.list" :scrollHeight="tableHeight" scrollable resizableColumns columnResizeMode="fit" showGridlines
          v-model:selection="selectItem" size="small" dataKey="id" selectionMode="single" ref="table" :loading="isLoading">
          <Column field="id" class="w-[180px]">
            <template #header>
              <app-header-column type="number" title="Идентификатор" field="id" v-model:filter="filter.id" v-model:sort="sort.id" />
            </template>
          </Column>
          <Column field="name" class="w-[75%]">
            <template #header>
              <app-header-column type="string" title="Наименование" field="id" v-model:filter="filter.name" v-model:sort="sort.name" />
            </template>
          </Column>
          <Column class="w-[350px]">
            <template #header>
              <app-header-column type="date" title="Дата создания" field="created_date" v-model:filter="filter.created_date" v-model:sort="sort.created_date" />
            </template>
            <template #body="{ data }">
              {{ moment(data.created_date).format('YYYY.MM.DD HH:mm:ss') }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div ref="blockPagination">
        <Paginator :rows="storeServices.limit" :totalRecords="storeServices.count" ref="pagination" @click="setPaginaion" />
      </div>
    </div>
  </div>
  <DynamicDialog />
  <ConfirmDialog />
</template>

<script lang="ts" setup>
import type { Service, FilterService, SortService } from '~/types/Service'
import type { DynamicDialogOptions, DynamicDialogCloseOptions } from 'primevue/dynamicdialogoptions/DynamicDialogOptions'
import type { PageState } from 'primevue/paginator/Paginator'
import type { TitleBlock } from '~/types/Form'
import moment from 'moment'
import { useStoreServices } from '~/stores/services.store'
import { useConfirm } from "primevue/useconfirm"


const confirm = useConfirm()

useHead({
  title: 'Сервисы'
})

const filter = reactive<FilterService>({
  id: null,
  name: null,
  created_date: null
}) // Значение фильтров

const sort = reactive<SortService>({
  id: null,
  name: null,
  created_date: null
}) // Данные сортировки 

const storeServices = useStoreServices() // Создание стора
const editModal = defineAsyncComponent(() => import('./edit.vue'))
const dialog: DynamicDialogOptions = useDialog() // Модуль диалогов
const table: any = ref() // Ссылка на таблицу
const pagination: Ref<PageState | null> = ref(null) // Идентификатор элемента пагинации
const selectItem: Ref<Service | null> = ref(null) // Выделенный элемент
const tableHeight = ref() // Высота таблицы
const titleBlock: Ref<TitleBlock | null> = ref(null) // Элемент заголовок страницы
const blockPagination = ref() // Родительский элемент пагинации

const valuePagination: ComputedRef<any> = computed(() => pagination.value?.page || 0) // Получение значения пагинации
const isLoading: ComputedRef<boolean> = computed(() => storeServices.isLoading) // Вычисление значения загрузки данных

/** 
** Вычисление активности кнопки "Изменить" и "Удалить"
** Если строка не выбрана, то кнопка не активна
* @function disabled
*/
const disabled: ComputedRef<boolean> = computed(() => !selectItem.value)

/** 
** Получение списка "Сервисы"
* @async
* @function updateList
*/
const updateList: () => Promise<void> = async () => {
  await nextTick() // Ожидание загрузки DOM
  await storeServices.getList() // Получение списка
}

/** 
** Получение значения высоты таблицы
* @function heightTable
*/
const heightTable = () => `${window.innerHeight - (titleBlock.value ? titleBlock.value?.offsetHeight : 100) - blockPagination.value.offsetHeight - (window.innerHeight > 400 && window.innerWidth > 500 ? 67 : 64)}px` // Вычисление высоты таблицы

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
* @function onCreate
*/
const onCreate = async (): Promise<void> => {
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
    onClose: async (args: any): Promise<void> => {
      await updateList()
      selectItem.value = storeServices.list[0] // Выделение созданного элемента(находится первый в списке)
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
const onEdit = async (): Promise<void> => {
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
    onClose: async (args: any): Promise<void> => {
      await updateList()
    },
    data: {
      type: 'edit', // Тип модального окна
      item: selectItem.value
    }
  }
  dialog.open(editModal, options) // Открытие модельного окна для добавления нового сервиса
}

/** 
** Удаление записи
* @function onDelete
*/
const onDelete = async (): Promise<void> => {
  if(selectItem.value) {
    confirm.require({
      message: `Удалить сервис "${selectItem.value.name}"?`,
      header: 'Подтверждение',
      icon: 'pi pi-exclamation-triangle',
      rejectClass: 'p-button-secondary p-button-outlined',
      rejectLabel: 'Отмена',
      acceptLabel: 'Удалить',
      acceptClass: 'p-button-danger',
      accept: async () => {
        if(selectItem.value) {
          storeServices.record = selectItem.value
          const resDel: boolean = await storeServices.del()
          if(resDel) {
            await updateList()
          }
        }
      }
    })
  }
}

/** 
** Установка пагинации
* @function setPaginaion
*/
const setPaginaion = async () => {
  storeServices.offset = valuePagination.value * storeServices.limit
  await updateList()
}

watch(filter, async (newVal) => {
  storeServices.filter = newVal // Установка фильтра
  await updateList()
  selectItem.value = null
})

watch(sort, async (newVal) => {
  storeServices.sort = newVal // Установка сортировки
  await updateList()
  selectItem.value = null
}) 
</script>