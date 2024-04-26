<template>
  <div class="w-full h-full max-h-full shadow-xl surface-0 p-1">
    <div class="border-b bord4er-l border-r pl-2 pt-2 shadow-xl surface-0 bg-blue-50" id="title" ref="titleBlock">
      <h5>Офферы</h5>
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
  </div>
</template>

<script lang="ts" setup>
import type {
  DynamicDialogOptions
} from 'primevue/dynamicdialogoptions/DynamicDialogOptions'

/**
 ** Добавление нового категории
 ** Открывается модальное окно для добавления
 * @function onCreate
 */
const onCreate = async (): Promise<void> => {
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
      await updateList()
      selectItem.value = storeCategories.list[0] // Выделение созданного элемента(находится первый в списке)
    },
    data: {
      type: 'create', // Тип модального окна
    },
  } // Параметры модального окна
  dialog.open(editModal, options) // Открытие модельного окна для добавления новой категории
}

</script>
