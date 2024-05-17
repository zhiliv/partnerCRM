<template>
  <div class="w-full h-full flex flex-wrap">
    <div class="w-full h-[91%]">
      <div>
        <label for="name">Имя поля</label>
        <InputText id="name" type="text" v-model="record.values.name" class="w-full" />
      </div>
      <div class="mt-1">
        <label for="table">Имя сущности</label>
        <Dropdown
          v-model="record.table"
          :options="list"
          optionLabel="name"
          placeholder="Выберите таблицу"
          class="w-full md:w-14rem"
        />
      </div>
      <div class="mt-1">
        <label for="label">Текстовое значение</label>
        <InputText id="label" type="text" v-model="record.values.label" class="w-full" />
      </div>
      <div class="mt-1">
        <label for="description">Описание</label>
        <InputText id="description" type="text" v-model="record.values.description" class="w-full" />
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
import type { FieldsField } from '~/types/Field'
import { useStoreFields } from '~/stores/fields.store'

const storeFileds = useStoreFields() // Создание стора
const dialogRef: any = inject('dialogRef') // Ссылка на диалоговое окно
const isTypeModal: Ref<'create' | 'edit' | null> = ref(null) // Тип формы(создание\редактирование)
const record = reactive<FieldsField>({ table: null, values: { name: null, label: null, description: null } }) // Данные записи
const isChanged: Ref<boolean> = ref(false) // Признак изменений записи

const list = ref([{ name: 'organizations', value: 'organizations' }]) // Список таблиц содержащих дополнительные поля

/**
 ** Вычисление валидности поля "Имя категории"
 * @function isValid
 */
const isValid: ComputedRef<boolean> = computed(() => !record || !record.name || record.name.length <= 3)

/**
 ** Отправка данных для создания записи
 * @function create
 */
const create = async () => {
  if (!record.name) {
    showToast({ message: 'Необходимо заполнить поле "Имя поля"', type: 'warn' })
  }
  if (record.name) {
    storeFileds.record = record
    await storeFileds.create() // Создание нового дополнительного поля
    const newRecord: FieldsField = storeFileds.record // Передача созданного поля в родительскую форму
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
  }

  if (record.name) {
    storeFileds.record = record
    await storeFileds.update() // Обновление поля
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
    storeFileds.record = dialogRef.value.data.item
    await storeFileds.get()
    record.id = storeFileds.record.id // Присвоение идентификатора
    record.name = storeFileds.record.name // Присвоение имени
  }
})

watch(record, (newVal) => {
  isChanged.value = record.name !== storeFileds.record.name
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
