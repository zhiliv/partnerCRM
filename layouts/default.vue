<template>
  <div class="min-w-screen h-screen max-h-screen select-none">
    <div class="h-full w-full flex flex-col lg:flex-row">
      <MegaMenu :model="items" orientation="vertical" class="bg-zinc-50 shadow-xl surface-0">
        <template #start>
          <!-- Пользователь -->
        </template>
      </MegaMenu>
      <nuxtPage />
    </div>
  </div>
  <app-toast />
</template>
<script lang="ts" setup>
import type { Item } from '~/types/Menu'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
const route: RouteLocationNormalizedLoaded = useRoute() // Получение значения роута

const items: Ref<Item[]> = ref([
  {
    label: 'Статистика', icon: 'pi pi-fw pi-video', url: '/',
  },
  {
    label: 'Сервисы', icon: 'pi pi-fw pi-video', url: '/services',
  },
  {
    label: 'Сервисы1', icon: 'pi pi-fw pi-video', url: '/services1'
  }
]) // Список меню

onMounted(() => {
  /** Установка класса активной ссылки */
  items.value.forEach((el: Item, index: number) => {
    if(el.url === route.path) {
      items.value[index].class = 'p-menuitem-active'
    }
  })
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
  background: var(--green-400);
  border-radius: 6px;
}

.p-menuitem-content {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}

.p-menuitem-link {
  width: 100%;
  height: 40px;
  margin: 4px;
}

.p-menuitem-content:hover {
  background: var(--green-500);
  border-radius: 6px;
}

.p-menuitem-link:hover .p-menuitem-text {
  color: white !important;
}
</style>~/types/Menu