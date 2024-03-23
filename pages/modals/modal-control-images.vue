<template>
  <div class="col-span-12 mx-4">
    <app-carousel
      :images="images"
      @update="setImages"
    />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['data'])
/** 
* @type Props
* @param {Object} modelValue - Данные формы
*/
type Props = {
  modelValue?: any
}

const images = ref([])

/** Установка значений по умолчанию для входных параметров  */
const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
})

images.value = props.modelValue.images

/** 
** Обновление данных о изображениях
* @function setImages
* @param {Object} event - Данные 
*/
function setImages(event: any) {
  emit('data', event)
}

</script>