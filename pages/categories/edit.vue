<template>
  <div class="w-full h-full flex flex-wrap">
    <div class="w-full h-[91%]">
      <label for="name">Наименование категории</label>
      <InputText id="name" type="text" v-model="record.name" class="w-full" :invalid="isValid" />
    </div>
    <div class="pt-4 w-full justify-between flex border-t" v-if="isTypeModal === 'create'">
      <Button class="w-[120px] text-center" label="Создать" severity="success" :disabled="isValid" @click="create" size="small" />
      <Button class="flex w-[120px]" label="Закрыть" severity="warning" @click="close" size="small" />
    </div>
    <div class="pt-4 w-full justify-between flex border-t" v-if="isTypeModal === 'edit'">
      <Button class="w-[120px] text-center" label="Сохранить" severity="success" :disabled="isValid || !isChanged" @click="update" size="small" />
      <Button class="flex w-[120px]" label="Отменить" severity="warning" @click="close" size="small" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FieldsCategory } from '~/types/Category'
import { useStoreCategories } from '~/stores/categories.store'

const storeCategories = useStoreCategories() // Создание стора
const dialogRef: any = inject('dialogRef') // Ссылка на диалоговое окно
const isTypeModal: Ref<'create' | 'edit' | null> = ref(null) // Тип формы(создание\редактирование)
const record = reactive<FieldsCategory>({}) // Данные записи
const isChanged: Ref<boolean> = ref(false) // Признак изменений записи

/** 
** Вычисление валидности поля "Наименование категории"
* @function isValid
*/
const isValid: ComputedRef<boolean> = computed(() => !record || !record.name || record.name.length <= 3)

/** 
** Отправка данных для создания записи
* @function create
*/
const create = async () => {
  if(!record.name) {
    showToast({ message: 'Необходимо заполнить поле "Наименование категории"', type: 'warn' })
  }
  if(record.name) {
    storeCategories.record = record 
    await storeCategories.create()  // Создание новой категории
    const newRecord: FieldsCategory = storeCategories.record // Передача созданной категории в родительскую форму
    dialogRef.value.close(newRecord) // Закрытие формы и отправка данных в родительскую форму
  }
}

/**  
** Сохранить изменение записи
* @function update
*/
const update = async () => {
  if(!record.name) {
    showToast({ message: 'Необходимо заполнить поле "Наименование категории"', type: 'warn' })
  }

  if(record.name) {
    storeCategories.record = record
    await storeCategories.update() // Обновление категории
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
  if(isTypeModal.value === 'edit') {
    storeCategories.record = dialogRef.value.data.item
    await storeCategories.get()
    record.id = storeCategories.record.id // Присвоение идентификатора
    record.name = storeCategories.record.name // Присвоение имени
  }
})

watch(record, (newVal) => {
  isChanged.value = record.name !== storeCategories.record.name
})
</script>

<style>
.p-dialog-content{
  height: 100%;
}

.p-dialog{
  margin: 0px;
}
</style>