<template>
  <div class="w-full h-full flex flex-wrap">
    <div class="w-full max-h-[91%] h-[91%] overflow-y-auto">
      <label for="name">Наименование организации</label>
      <InputText id="name" type="text" v-model="record.name" class="w-full" :invalid="isValid" />
      <label for="service">Сервис</label>
      <Dropdown
        v-model="record.service_id"
        :options="storeServices.list"
        optionLabel="name"
        optionValue="id"
        placeholder="Дополнительное поле"
        class="w-full h-[36px]"
        inputClass="h-[26px] text-[14px] pt-[5px]"
        size="small"
      />
      <div class="w-full h-[200px] border mt-2 border-b shadow-md rounded-lg bg-gray-50">
        <div class="flex justify-between items-center border-b p-2">
          <label class="">Изображения</label>
          <Button class="" label="Управление изображениями" size="small" @click="editImage" icon="pi pi-images" />
        </div>
        <div class="p-1">
          <div class="flex justify-center">
            <span class="pt-12 text-[20px]">Изображение по умолчанию отсутствует</span>
          </div>
          <template v-for="(image, index) of record.images" :key="image.name">
            <img :src="image.url" class="w-full h-24 object-cover" />
          </template>
        </div>
      </div>
      <div class="border mt-4 p-3 shadow-md rounded-xl bg-gray-50">
        <div>
          <template v-for="(item, index) of record.information" :key="item.name">
            <template v-if="item.type === 'string'">
              <label :for="item.name" class="pl-1 font-medium text-[14px]">{{ item.label }}</label>
              <div class="flex">
                <InputText :id="item.name" type="text" v-model="item.value" class="w-full h-[36px]" size="small" />
                <Button
                  severity="danger"
                  icon="pi pi-trash"
                  class="w-[36px] h-[36px] ml-2"
                  @click="deleteField(index)"
                />
              </div>
            </template>

            <template v-if="item.type === 'editor'">
              <div class="flex justify-between p-2 items-center">
                <label :for="item.name" class="pl-1 font-medium text-[14px]">{{ item.label }}</label>
                <Button
                  severity="danger"
                  icon="pi pi-trash"
                  class="w-[36px] h-[36px] ml-2"
                  @click="deleteField(index)"
                />
              </div>
              <div>
                <app-editor></app-editor>
              </div>
            </template>
          </template>
        </div>

        <div class="pt-2 flex justify-between">
          <Dropdown
            v-model="dataField"
            :options="listFields"
            optionLabel="values.label"
            optionValue="values"
            placeholder="Дополнительное поле"
            class="w-full h-[36px]"
            inputClass="h-[26px] text-[14px] pt-[5px]"
            size="small"
          >
            <template #header>
              <Button label="Создать новое поле" class="w-full h-[36px]" severity="secondary" @click="createField" />
            </template>
          </Dropdown>
          <Button
            label="Добавить поле"
            class="ml-2 w-[250px] h-[36px]"
            icon="pi pi-plus"
            :disabled="dataField && !dataField.name"
            @click="addField"
          />
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
import type { FieldsOrganization } from '~/types/Organization'
import type { DynamicDialogOptions } from 'primevue/dynamicdialogoptions/DynamicDialogOptions'
import { useStoreOrganizations } from '~/stores/organizations.store'
import { useStoreServices } from '~/stores/services.store'
import { useStoreFields } from '~/stores/fields.store'

const editModalField = defineAsyncComponent(() => import('./../fields/edit.vue'))
const editModalImages = defineAsyncComponent(() => import('./../images/edit.vue'))
const storeOrganizations = useStoreOrganizations() // Создание стора
const storeFields = useStoreFields() // Стор полей
const storeServices = useStoreServices() // Стор сервисов
const listFieldsStore = ref([]) // Список полей из хранилища
const dialog: DynamicDialogOptions = useDialog() // Модуль диалогов
const dialogRef: any = inject('dialogRef') // Ссылка на диалоговое окно
const isTypeModal: Ref<'create' | 'edit' | null> = ref(null) // Тип формы(создание\редактирование)
const record = reactive<FieldsOrganization>({ name: null, information: [], images: [], service_id: null }) // Данные записи
const isChanged: Ref<boolean> = ref(false) // Признак изменений записи
const dataField: Ref<{
  name?: string | null
  label?: string | null
  description?: string | null
  type?: string | null
}> | null = ref({}) // Добавляемое поле

const listFields: any = computed(() =>
  listFieldsStore.value.filter((el: { name: string; label: string; description: string; type: string }) => {
    const index = record.information.findIndex(
      (item: { name: string; label: string; description: string; type: string }) => item.name === el.name,
    )
    if (index === -1) return el
  }),
) // Получение списка добавленных полей

storeFields.table = 'organizations'
await storeFields.getTable()
await storeServices.getList() // Получение сервисов

/**
 ** Вычисление валидности поля "Наименование организации"
 * @function isValid
 */
const isValid: ComputedRef<boolean> = computed(() => !record || !record.name || record.name.length <= 3)

/**
 ** Отправка данных для создания записи
 * @function create
 */
const create = async (): Promise<void> => {
  if (!record.name) {
    showToast({ message: 'Необходимо заполнить поле "Наименование организации"', type: 'warn' })
  }
  if (record.name) {
    storeOrganizations.record = record
    await storeOrganizations.create() // Создание новой организации
    const newRecord: FieldsOrganization = storeOrganizations.record // Передача созданной организации в родительскую форму
    dialogRef.value.close(newRecord) // Закрытие формы и отправка данных в родительскую форму
  }
}

/**
 ** Сохранить изменение записи
 * @function update
 */
const update = async (): Promise<void> => {
  if (!record.name) {
    showToast({ message: 'Необходимо заполнить поле "Наименование организации"', type: 'warn' })
  }

  if (record.name) {
    storeOrganizations.record = record
    await storeOrganizations.update() // Обновление оргазизации
    close()
  }
}

/**
 ** Закрытие окна без внесения изменений
 * @function close
 */
const close = (): void => {
  dialogRef.value.close()
}

onMounted(async () => {
  listFieldsStore.value = storeFields.listTable
  isTypeModal.value = dialogRef.value.data.type // Установка типа формы
  if (isTypeModal.value === 'edit') {
    // storeFields.listTable
    storeOrganizations.record = dialogRef.value.data.item
    await storeOrganizations.get()
    record.id = storeOrganizations.record.id // Присвоение идентификатора
    record.name = storeOrganizations.record.name // Присвоение имени
    record.service_id = storeOrganizations.record.service_id // Присвоение имени
    record.information = storeOrganizations.record.information // Добавление информации
    record.images = JSON.parse(JSON.stringify(storeOrganizations.record.images)) // Добавление изображений
  }
})

watch(record, () => {
  console.log('information', storeOrganizations.record.information)
  if (record.name !== storeOrganizations.record.name) {
    isChanged.value = true
  } else if (record.service_id !== storeOrganizations.record.service_id) {
    isChanged.value = true
  } else if (JSON.stringify(record.information) !== JSON.stringify(storeOrganizations.record.information)) {
    isChanged.value = true
  } else if (JSON.stringify(record.images) !== JSON.stringify(storeOrganizations.record.images)) {
    isChanged.value = true
  } else {
    isChanged.value = false
  }
})

/**
 ** Добавление поля в поле информации
 * @function addField
 */
const addField = async (): Promise<void> => {
  const obj = {
    name: dataField.value.name,
    label: dataField.value.label,
    value: null,
    type: dataField.value.type,
  }
  record.information.push(obj)
}

/**
 ** Удаление дополнительного поля из списка информации
 * @function deleteField
 */
const deleteField = (index: number): void => {
  record.information.splice(index, 1)
}

/**
 ** Добавление нового дополнительного поля
 ** Открывается модальное окно для добавления
 * @function createField
 */
const createField = async (): Promise<void> => {
  const options: DynamicDialogOptions = {
    props: {
      header: 'Создать новое поле',
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
    onClose: async (args: any) => {
      const data: never | any = args.data
      data.values = args.data
      listFields.value.push(data)
      await storeFields.getList()
      listFieldsStore.value = storeFields.listTable
    },

    data: {
      type: 'create', // Тип модального окна
    },
  } // Параметры модального окна
  dialog.open(editModalField, options) // Открытие модельного окна для добавления нового поля
}

/**
 ** Добавление нового дополнительного поля
 ** Открывается модальное окно для добавления
 * @function createField
 */
const editImage = async (): Promise<void> => {
  const options: DynamicDialogOptions = {
    props: {
      header: 'Управление изображениями',
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
    onClose: async (args: any) => {
      /* const data: never | any = args.data
      data.values = args.data
      listFields.value.push(data)
      await storeFields.getList()
      listFieldsStore.value = storeFields.listTable */
    },

    data: {
      type: 'create', // Тип модального окна
    },
  } // Параметры модального окна
  dialog.open(editModalImages, options) // Открытие модельного окна для добавления нового поля
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
