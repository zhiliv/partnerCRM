<template>
  <div class="w-full h-full flex flex-wrap">
    <div class="w-full h-[91%]">
      <div>
        <label for="name">Имя поля</label>
        <InputText id="name" type="text" v-model="record.name" class="w-full" />
      </div>
      <div class="mt-1">
        <label for="table">Имя таблицы</label>
        <Dropdown
          v-model="record.table"
          :options="list"
          optionLabel="name"
          optionValue="value"
          placeholder="Выберите таблицу"
          class="w-full md:w-14rem"
        />
      </div>
      <div class="mt-1">
        <label for="label">Заголовок</label>
        <InputText id="label" type="text" v-model="record.label" class="w-full" />
      </div>
      <div class="mt-1">
        <label for="description">Описание</label>
        <InputText id="description" type="text" v-model="record.description" class="w-full" />
      </div>
      <div class="mt-1">
        <label for="table">Тип данных</label>
        <Dropdown
          v-model="record.type"
          :options="listTypes"
          optionLabel="name"
          optionValue="value"
          placeholder="Выберите тип данных"
          class="w-full md:w-14rem"
        />
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
import type { EditField, FieldsField } from '~/types/Field'
import { useStoreFields } from '~/stores/fields.store'

const storeFields = useStoreFields() // Создание стора
const dialogRef: any = inject('dialogRef') // Ссылка на диалоговое окно
const isTypeModal: Ref<'create' | 'edit' | null> = ref(null) // Тип формы(создание\редактирование)
const record = reactive<EditField>({ table: null, name: null, label: null, description: null }) // Данные записи
const isChanged: Ref<boolean> = ref(false) // Признак изменений записи

const list = ref([
  { name: 'organizations', value: 'organizations' },
  { name: 'offers', value: 'offers' },
]) // Список таблиц содержащих дополнительные поля

const listTypes = ref([
  { name: 'Текст', value: 'string' },
  { name: 'Число', value: 'number' },
  { name: 'Дата', value: 'date' },
]) // Список типов  дополнительных полей

/**
 ** Вычисление валидности поля "Имя поля"
 * @function isValid
 */
const isValid: ComputedRef<boolean> = computed(
  () =>
    !record ||
    !record.name ||
    !record.name.length ||
    !record.label ||
    !record.label.length ||
    !record.description ||
    !record.description.length ||
    !record.table || !record.type
)

/**
 ** Отправка данных для создания записи
 * @function create
 */
const create = async () => {
  if (!record.name) {
    showToast({ message: 'Необходимо заполнить поле "Имя поля"', type: 'warn' })
    return
  }

  if (!record.label) {
    showToast({ message: 'Необходимо заполнить поле "Заголовок"', type: 'warn' })
    return
  }

  if (!record.table) {
    showToast({ message: 'Необходимо заполнить поле "Имя таблицы"', type: 'warn' })
    return
  }

  if (!record.description) {
    showToast({ message: 'Необходимо заполнить поле "Описание"', type: 'warn' })
    return
  }

  if (record.name) {
    storeFields.record = record
    await storeFields.create() // Создание нового дополнительного поля
    const newRecord: FieldsField = storeFields.record // Передача созданного поля в родительскую форму
    console.log("🚀 -> create -> newRecord:", newRecord)
    dialogRef.value.close(newRecord) // Закрытие формы и отправка данных в родительскую форму
  }
}

/**
 ** Сохранить изменение записи
 * @function update
 */
const update = async () => {
  if (!record.name) {
    showToast({ message: 'Необходимо заполнить поле "Имя поля"', type: 'warn' })
    return
  }

  if (!record.label) {
    showToast({ message: 'Необходимо заполнить поле "Заголовок"', type: 'warn' })
    return
  }

  if (!record.table) {
    showToast({ message: 'Необходимо заполнить поле "Имя таблицы"', type: 'warn' })
    return
  }

  if (!record.description) {
    showToast({ message: 'Необходимо заполнить поле "Описание"', type: 'warn' })
    return
  }

  if (record.name && record.label && record.table && record.description && record.type) {
    storeFields.record = record
    await storeFields.update() // Обновление поля
    close(storeFields.record)
  }
}

/**
 ** Закрытие окна без внесения изменений
 * @function close
 */
const close = (data?: any) => {
  dialogRef.value.close(data)
}

onMounted(async () => {
  isTypeModal.value = dialogRef.value.data.type // Установка типа формы
  if (isTypeModal.value === 'edit') {
    storeFields.record = dialogRef.value.data.item
    await storeFields.get()
    record.id = storeFields.record.id // Присвоение идентификатора
    record.name = storeFields.record.name // Присвоение имени
    record.label = storeFields.record.label // Присвоение заголовка
    record.description = storeFields.record.description // Описания
    record.table = storeFields.record.table // Присвоение таблицы
    record.type = storeFields.record.type // Присвоение типа
  }
})

watch(record, () => {
  isChanged.value =
    record.name !== storeFields.record.name ||
    record.label !== storeFields.record.label ||
    record.description !== storeFields.record.description ||
    record.table !== storeFields.record.table
})
</script>

<style>
.p-dialog-content {
  height: 100%;
}

.p-dialog {
  margin: 0px;
}
</style>
