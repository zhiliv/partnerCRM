<template>
  <div class="min-w-screen h-screen max-h-screen select-none">
    <div class="h-full w-full flex flex-col lg:flex-row">
      <LazyMegaMenu :model="items" orientation="vertical" class="bg-zinc-50 shadow-xl surface-0" v-if="isLoading">
        <template #start>
          <!-- Пользователь -->
        </template>
      </LazyMegaMenu>
      <nuxtPage />
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

const items: Ref<Item[]> = ref([
  {
    label: 'Статистика', url: '/',
  },
  {
    label: 'Группы', url: '/groups',
  },
  {
    label: 'Категории', url: '/categories'
  },
  {
    label: 'Сервисы', url: '/services'
  }
]) // Список меню

onMounted(() => {
  /** Установка класса активной ссылки */
  items.value.forEach((el: Item, index: number) => {
    if(el.url === route.path) {
      items.value[index].class = 'p-menuitem-active'
    }
  })
  isLoading.value = true
})
</script>

<style>
@media (min-width: 960px) {
  .p-megamenu-vertical {
    width: 350px
  }
}

.p-menuitem {
  min-height: 40px;
  display: flex;
  width: 100%;
  align-items: center;

}

.p-menuitem-active {
  background: var(--green-600);
  border-radius: 6px;
}

.p-menuitem-active .p-menuitem-text{
  color: white
}

.p-menuitem-content {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}

.p-menuitem-link {
  width: 100%;
  height: 30px;
  margin: 4px;
}

.p-menuitem-content:hover {
  background: var(--green-300);
  border-radius: 6px;
  
}

.p-menuitem-link:hover .p-menuitem-text {
  
}
</style>~/types/Menu