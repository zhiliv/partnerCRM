<template>
  <div class="w-full h-[76vh] flex flex-col">
    <div class="grow">
      <label for="name">Наименование сервиса</label>
      <InputText id="name" type="text" v-model="name" class="w-full" :invalid="isValid" />
    </div>
    <div class="pt-4 w-full justify-between flex border-t" v-if="isTypeModal === 'create'">
      <Button class="w-[120px] text-center" label="Создать" severity="success" :disabled="isValid" @click="create" />
      <Button class="flex w-[120px]" label="Закрыть" severity="warning" @click="close" />
    </div>
    <div class="pt-4 w-full justify-between flex border-t" v-if="isTypeModal === 'edit'">
      <Button class="w-[120px] text-center" label="Сохранить" severity="success" :disabled="isValid" @click="create" />
      <Button class="flex w-[120px]" label="Отменить" severity="warning" @click="close" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Service } from '~/types/service'
import { useStoreServices } from '~/stores/services.store'

const storeServices = useStoreServices() // Создание стора
const dialogRef: any = inject('dialogRef') // Ссылка на диалоговое окно
const isTypeModal: Ref<'create' | 'edit' | null> = ref(null) // Тип формы(создание\редактирование)
const name = ref<string | null>(null) // Имя сервиса


/** 
** Вычисление валидности поля "Наименование сервиса"
* @function isValid
*/
const isValid: ComputedRef<boolean> = computed(() =>
  Boolean(!name.value || name.value && name.value.length <= 3)
  || Boolean(name.value && /\d/.test(name.value)))

/** 
** Отправка данных для создания записи
* @function create
*/
const create = async () => {
  if(name.value) {
    const newRecord: Service = await storeServices.create({ name: name.value })  // Создание нового сервиса
    dialogRef.value.close(newRecord) // Закрытие формы и отправка данных в родительскую форму
  }
}

/** 
** Закрытие окна без внесения изменений
* @function close
*/
const close = () => {
  dialogRef.value.close()
}

onMounted(() => {
  isTypeModal.value = dialogRef.value.data.type // Установка типа формы
  if(isTypeModal.value === 'edit'){
    storeServices.get(dialogRef.value.data.item)
  }
})
</script>