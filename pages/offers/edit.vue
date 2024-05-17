<template>
  <div class="w-full h-full flex flex-wrap">
    <div class="w-full h-[91%]">
      <label for="name">Наименование документа</label>
      <InputText id="name" type="text" v-model="record.name" class="w-full" :invalid="isValid" />
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
import { useStoreDocuments } from '~/stores/documents.store'
import type { FieldsDocument, Document } from '~/types/Document';


const storeDocuments = useStoreDocuments() // Создание стора
const dialogRef: any = inject('dialogRef') // Ссылка на диалоговое окно
const isTypeModal: Ref<'create' | 'edit' | null> = ref(null) // Тип формы(создание\редактирование)
const record = reactive<FieldsDocument>({
  name: null
}) // Данные записи
const isChanged: Ref<boolean> = ref(false) // Признак изменений записи

/**
 ** Вычисление валидности поля "Наименование документа"
 * @function isValid
 */
const isValid: ComputedRef<boolean> = computed(() => !record || !record.name || record.name.length <= 3)

/**
 ** Отправка данных для создания записи
 * @function create
 */
const create = async () => {
  if (!record.name) {
    showToast({ message: 'Необходимо заполнить поле "Наименование документа"', type: 'warn' })
  }
  if (record.name) {
    storeDocuments.record = record
    await storeDocuments.create() // Создание нового документа
    const newRecord: FieldsDocument = storeDocuments.record // Передача созданного документа в родительскую форму
    dialogRef.value.close(newRecord) // Закрытие формы и отправка данных в родительскую форму
  }
}

/**
 ** Сохранить изменение записи
 * @function update
 */
const update = async () => {
  if (!record.name) {
    showToast({ message: 'Необходимо заполнить поле "Наименование документа"', type: 'warn' })
  }

  if (record.name) {
    storeDocuments.record = record
    await storeDocuments.update() // Обновление документа
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
    storeDocuments.record = dialogRef.value.data.item
    await storeDocuments.get()
    record.id = storeDocuments.record.id // Присвоение идентификатора
    record.name = storeDocuments.record.name // Присвоение имени
  }
})

watch(record, (newVal) => {
  isChanged.value = record.name !== storeDocuments.record.name
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
