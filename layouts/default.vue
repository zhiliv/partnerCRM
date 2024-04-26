<template>
  <div class="min-w-screen h-screen max-h-screen select-none">
    <div class="h-full w-full flex flex-col lg:flex-row">
      <div class="flex flex-col w-[300px] menu">
        <template v-for="item in items">
          <NuxtLink :to="item.url" v-if="!item.list" class="p-1 pl-3 lnk m-[1px]" :class="item.class">{{
            item.label
          }}</NuxtLink>
          <template v-if="item.list">
            <div
              class="p-1 pl-3 w-full flex justify-between pr-3 lnk items-center"
              @click="item.isVisible = !item.isVisible"
            >
              <span>{{ item.label }}</span>
              <i class="pi" :class="{ 'pi-chevron-down': !item.isVisible, 'pi-chevron-up': item.isVisible }" />
            </div>

            <NuxtLink
              v-for="subItem in item.list"
              v-if="item.isVisible"
              :to="subItem.url"
              class="p-1 pl-5 lnk w-full m-1"
              :class="subItem.class"
              >{{ subItem.label }}</NuxtLink
            >
          </template>
        </template>
      </div>
      <div class="w-full h-full max-h-full shadow-xl surface-0 p-1">
      <nuxtPage />
      </div>
    </div>
  </div>
  <app-toast />
  <LazyDynamicDialog v-if="isLoading" />
  <LazyConfirmDialog v-if="isLoading" />
</template>
<script lang="ts" setup>
import type { Item } from '~/types/Menu'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const isLoading = ref<boolean>(false)
const route: RouteLocationNormalizedLoaded = useRoute() // Получение значения роута

const items = ref<Item[]>([
  {
    label: 'Статистика',
    url: '/',
  },
  {
    label: 'Группы',
    url: '/groups',
  },
  {
    label: 'Категории',
    url: '/categories',
  },
  {
    label: 'Сервисы',
    url: '/services',
  },
  {
    label: 'Офферы',
    url: '/offers',
  },
  {
    label: 'Справочники',
    list: [
      { label: 'Способ получения денег', url: '/method_get_money' },
      { label: 'Документы', url: '/documents' }
    ],
  },
]) // Список меню

/**
 ** Выделение активного пункта меню
 * @function useMenu
 */
const useMenu = () => {
  /* Сброс классов */
  items.value.forEach((el: Item, index: number) => {
    el.class = ''
    // Перебор всех элементов меню
    if (el.list) {
      el.list.forEach((item, subIndex: number) => {
        item.class = ''
      })
    }
  })

  items.value.forEach((el: Item, index: number) => {
    // Перебор всех элементов меню
    if (el.list) {
      el.list.forEach((item, subIndex: number) => {
        // перебор всех подменю
        if (item.url === route.path) {
          items.value[index].isVisible = true // отображать выпадающий список
          const list = items.value[index].list // Список подменю
          if (list && list.length) {
            list[subIndex].class = 'active' // Добавление класса активного пункта меню
          }
        }
      })
    }
    if (el.url === route.path) {
      items.value[index].class = 'active'
    }
  })
}

onMounted(() => {
  useMenu()
  isLoading.value = true
})

watch(
  () => route.path,
  () => {
    useMenu()
  },
)
</script>

<style>
.lnk.active {
  background-color: #16a34a;
  border-radius: 7px;
  color: white;
}

.lnk:hover {
  background: #22c55e;
  border-radius: 7px;
  color: #f9fafb;
}
</style>
