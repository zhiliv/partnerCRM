<template>
  <div class="w-full h-full flex flex-wrap">
    <div class="w-full h-[91%]">
      <div>
        <label for="name">Наименование периода</label>
        <InputText id="name" type="text" v-model="record.name" class="w-full" :invalid="isValid" />
      </div>
      <div class="pt-1">
        <label for="padez">Родительский падеж</label>
        <InputText id="padez" type="text" v-model="record.padez" class="w-full" :invalid="isValid" />
      </div>
      <div class="pt-1">
        <label for="mnozh">Наименование периода</label>
        <InputText id="mnozh" type="text" v-model="record.mnozh" class="w-full" :invalid="isValid" />
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
import { useStorePeriods } from '~/stores/periods.store'
import type { FieldsPeriod } from '~/types/Period'

const storePeriods = useStorePeriods() // Создание стора
const dialogRef: any = inject('dialogRef') // Ссылка на диалоговое окно
const isTypeModal: Ref<'create' | 'edit' | null> = ref(null) // Тип формы(создание\редактирование)
const record = reactive<FieldsPeriod>({
  name: null,
  padez: null,
  mnozh: null,
}) // Данные записи
const isChanged: Ref<boolean> = ref(false) // Признак изменений записи

/**
 ** Вычисление валидности поля "Наименование документа"
 * @function isValid
 */
const isValid: ComputedRef<boolean> = computed(() => !record || !record.name || record.name.length <= 2)

/**
 ** Отправка данных для создания записи
 * @function create
 */
const create = async () => {
  if (!record.name) {
    showToast({ message: 'Необходимо заполнить поле "Наименование документа"', type: 'warn' })
  }
  if (record.name) {
    storePeriods.record = record
    await storePeriods.create() // Создание нового документа
    const newRecord: FieldsPeriod = storePeriods.record // Передача созданного документа в родительскую форму
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
    storePeriods.record = record
    await storePeriods.update() // Обновление документа
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
    storePeriods.record = dialogRef.value.data.item
    await storePeriods.get()
    record.id = storePeriods.record.id // Присвоение идентификатора
    record.name = storePeriods.record.name // Присвоение имени
    record.padez = storePeriods.record.padez // Присвоение падеж
    record.mnozh = storePeriods.record.mnozh  // Присвоение множественного числа
  }
})

watch(record, (newVal) => {
  isChanged.value = record.name !== storePeriods.record.name || record.padez !== storePeriods.record.padez || record.mnozh !== storePeriods.record.mnozh
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
