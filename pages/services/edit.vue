<template>
  <div class="w-full h-full flex flex-wrap">
    <div class="w-full h-[91%]">
      <label for="name">Наименование сервиса</label>
      <InputText id="name" type="text" v-model="record.name" class="w-full" :invalid="isValid" />
      <div class="pt-2" v-if="record.name">
        <label for="group">Группа</label>
        <div class="flex justify-between">
          <Dropdown
            v-model="record.id_group"
            :options="storeGroups.list"
            optionLabel="name"
            optionValue="id"
            class="w-[calc(100%-130px)]"
          />
          <Button severity="success" label="Создать" class="p-2 w-[120px]" @click="onCreateGroup" />
        </div>
      </div>
      <div class="pt-2" v-if="record.id_group">
        <label for="category">Категория</label>
        <div class="flex justify-between">
          <Listbox :options="listCategories" optionLabel="name" class="w-[calc(100%-130px)] h-[160px] overflow-y-auto">
            <template #option="slotProps">
              <div class="flex align-items-center p-0">
                <Checkbox id="category" v-model="record.categories" :value="slotProps.option" />
                <label class="text-filter text-[14px] pl-1">{{ slotProps.option.name }}</label>
              </div>
            </template>
          </Listbox>
          <Button severity="success" label="Создать" class="p-2 w-[120px] h-[40px]" @click="onCreateCategory" />
        </div>
      </div>
      <div class="mt-1">
        <span>Выбранные категории:</span>
      </div>
      <div class="max-h-[20%] overflow-y-auto" v-if="record.categories.length">
        <div>
          <Chip :label="category.name" v-for="category in record.categories" class="ml-1 mt-1" />
        </div>
      </div>
    </div>
    <div class="pt-4 w-full justify-between flex border-t" v-if="isTypeModal === 'create'">
      <Button
        class="w-[120px] text-center"
        label="Создать"
        severity="success"
        :disabled="isValid"
        @click="create"
        size="small"
      />
      <Button class="flex w-[120px]" label="Закрыть" severity="warning" @click="close" size="small" />
    </div>
    <div class="pt-4 w-full justify-between flex border-t" v-if="isTypeModal === 'edit'">
      <Button
        class="w-[120px] text-center"
        label="Сохранить"
        severity="success"
        :disabled="isValid || !isChanged"
        @click="update"
        size="small"
      />
      <Button class="flex w-[120px]" label="Отменить" severity="warning" @click="close" size="small" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FieldsService } from '~/types/Service'
import type { FieldsCategory } from '~/types/Category'
import type { DynamicDialogOptions } from 'primevue/dynamicdialogoptions/DynamicDialogOptions'
import { useStoreServices } from '~/stores/services.store'
import { useStoreGroups } from '~/stores/groups.store'
import { useStoreCategories } from '~/stores/categories.store'
const createModalGroup = defineAsyncComponent(() => import('./../groups/edit.vue'))
const createModalCategory = defineAsyncComponent(() => import('./../categories/edit.vue'))
const dialog: DynamicDialogOptions = useDialog() // Модуль диалогов

const storeServices = useStoreServices() // Создание стора
const storeGroups = useStoreGroups() // Создание стора
const storeCategories = useStoreCategories() // Создание стора
storeGroups.limit = 0 // Установка лимита
await storeGroups.getList() // Получение списка групп
storeCategories.limit = 0 // Установка лимита
await storeCategories.getList() // Получени списка категорий
const listCategories = computed(() => storeCategories.list.map((el: any) => ({ id: el.id, name: el.name })))

const dialogRef: any = inject('dialogRef') // Ссылка на диалоговое окно
const isTypeModal: Ref<'create' | 'edit' | null> = ref(null) // Тип формы(создание\редактирование)
const record = reactive<FieldsService>({
  name: null,
  id_group: null,
  id_category: [],
  add_categories_id: [],
  del_categories_id: [],
  categories: [],
}) // Данные записи
const isChanged: Ref<boolean> = ref(false) // Признак изменений записи

/** Отслеживание изменений категорий  */
watch(
  () => record.categories,
  (newVal: any) => {
    const ids: number[] = newVal.map((item: FieldsCategory) => item.id) // Все выбранные идентификаторы категорий
    if (isTypeModal.value === 'create') {
      // При создании новой записи
      record.add_categories_id = ids // Установка массива идентификатора категорий
    }
  },
)

/**
 ** Вычисление валидности поля "Наименование сервиса"
 * @function isValid
 */
const isValid: ComputedRef<boolean> = computed(() => !record || !record.name || record.name.length <= 3)

/**
 ** Отправка данных для создания записи
 * @function create
 */
const create = async () => {
  if (!record.name) {
    showToast({ message: 'Необходимо заполнить поле "Наименование сервиса"', type: 'warn' })
  }
  if (record.name) {
    storeServices.record = record
    await storeServices.create() // Создание нового сервиса
    const newRecord: FieldsService = storeServices.record // Передача созданного сервиса в родительскую форму
    dialogRef.value.close(newRecord) // Закрытие формы и отправка данных в родительскую форму
  }
}

/**
 ** Сохранить изменение записи
 * @function update
 */
const update = async () => {
  if (!record.name) {
    showToast({ message: 'Необходимо заполнить поле "Наименование сервиса"', type: 'warn' })
  }

  if (record.name) {
    storeServices.record = record
    await storeServices.update() // Обновление сервиса
    close()
  }
}

/**
 ** Закрытие окна без внесения изменений
 * @function close
 */
const close = () => {
  dialogRef.value.close()
}

onMounted(async () => {
  isTypeModal.value = dialogRef.value.data.type // Установка типа формы

  if (isTypeModal.value === 'edit') {
    storeServices.record = dialogRef.value.data.item
    await storeServices.get()
    record.id = storeServices.record.id // Присвоение идентификатора
    record.name = storeServices.record.name // Присвоение имени
    record.id_group = storeServices.record.id_group // Присвоение идентификатора группы
    record.categories = storeServices.record.categories.filter(
      (item: FieldsCategory) => item.id !== null || item.name !== null || !item,
    ) // Присвоение категорий
  }
})

watch(record, (newVal) => {
  isChanged.value = record.name !== storeServices.record.name
  if (record.name && record.name !== storeServices.record.name) {
    isChanged.value = true
  } else if (record.id_group && record.id_group !== storeServices.record.id_group) {
    isChanged.value = true
  } else if (
    record.categories.length &&
    JSON.stringify(record.categories) !==
      JSON.stringify(
        storeServices.record.categories.filter(
          (item: FieldsCategory) => item.id !== null || item.name !== null || !item,
        ),
      )
  ) {
    isChanged.value = true
  } else {
    isChanged.value = false
  }
})

/**
 ** Добавление новой группы
 ** Открывается модальное окно для добавления
 * @function onCreateGroup
 */
const onCreateGroup = async (): Promise<void> => {
  const options: DynamicDialogOptions = {
    props: {
      header: 'Создать новую группу',
      draggable: true, // Разрешить перетаскивание
      position: 'right', // Положение формы
      style: {
        height: '100%',
        width: '30%',
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '100vw',
      },
      modal: true,
    },
    onClose: async (args: any): Promise<void> => {
      await storeGroups.getList()
    },
    data: {
      type: 'create', // Тип модального окна
    },
  } // Параметры модального окна
  dialog.open(createModalGroup, options) // Открытие модельного окна для добавления нового сервиса
}

/**
 ** Добавление новой категории
 ** Открывается модальное окно для добавления
 * @function onCreateCategory
 */
const onCreateCategory = async (): Promise<void> => {
  const options: DynamicDialogOptions = {
    props: {
      header: 'Создать новую категорию',
      draggable: true, // Разрешить перетаскивание
      position: 'right', // Положение формы
      style: {
        height: '100%',
        width: '30%',
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '100vw',
      },
      modal: true,
    },
    onClose: async (args: any): Promise<void> => {
      await storeCategories.getList()
    },
    data: {
      type: 'create', // Тип модального окна
    },
  } // Параметры модального окна
  dialog.open(createModalCategory, options) // Открытие модельного окна для добавления нового сервиса
}
</script>

<style>
.p-dialog-content {
  height: 100%;
}

.p-dialog {
  margin: 0px;
}
</style>
