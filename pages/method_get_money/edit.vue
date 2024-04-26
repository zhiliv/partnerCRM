<template>
  <div class="w-full h-full flex flex-wrap">
    <div class="w-full h-[91%]">
      <label for="name">Наименование способа получения денег</label>
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
import { useStoreMethodGetMoney } from '~/stores/methodGetMoney.store'

const storeMethodGetMoney = useStoreMethodGetMoney() // Создание стора
const dialogRef: any = inject('dialogRef') // Ссылка на диалоговое окно
const isTypeModal: Ref<'create' | 'edit' | null> = ref(null) // Тип формы(создание\редактирование)
const record = reactive<FieldsCategory>({}) // Данные записи
const isChanged: Ref<boolean> = ref(false) // Признак изменений записи

/**
 ** Вычисление валидности поля "Наименование способа получения денег"
 * @function isValid
 */
const isValid: ComputedRef<boolean> = computed(() => !record || !record.name || record.name.length <= 3)

/**
 ** Отправка данных для создания записи
 * @function create
 */
const create = async () => {
  if (!record.name) {
    showToast({ message: 'Необходимо заполнить поле "Наименование способа получения денег"', type: 'warn' })
  }
  if (record.name) {
    storeMethodGetMoney.record = record
    await storeMethodGetMoney.create() // Создание нового способа получения денег
    const newRecord: FieldsCategory = storeMethodGetMoney.record // Передача созданного способа получения денег в родительскую форму
    dialogRef.value.close(newRecord) // Закрытие формы и отправка данных в родительскую форму
  }
}

/**
 ** Сохранить изменение записи
 * @function update
 */
const update = async () => {
  if (!record.name) {
    showToast({ message: 'Необходимо заполнить поле "Наименование способа получения денег"', type: 'warn' })
  }

  if (record.name) {
    storeMethodGetMoney.record = record
    await storeMethodGetMoney.update() // Обновление способа получения денег
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
    storeMethodGetMoney.record = dialogRef.value.data.item
    await storeMethodGetMoney.get()
    record.id = storeMethodGetMoney.record.id // Присвоение идентификатора
    record.name = storeMethodGetMoney.record.name // Присвоение имени
  }
})

watch(record, (newVal) => {
  isChanged.value = record.name !== storeMethodGetMoney.record.name
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
