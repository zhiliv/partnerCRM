<template>
  <div class="min-w-screen h-screen max-h-screen select-none">
    <div class="h-full w-full flex flex-col lg:flex-row">
      <MegaMenu :model="items" orientation="vertical" class="bg-zinc-50 shadow-xl surface-0">
        <template #start>
          <!-- Пользователь -->
        </template>
        <template #item="{ item }">
          <li :class="{ 'active': item.id === activeItem }">
            <a :href="item.href">{{ item.label }}</a>
          </li>
        </template>
      </MegaMenu>
      <nuxtPage />
    </div>
  </div>
  <app-toast />
</template>
<script lang="ts" setup>
const items = ref([
  {
    label: 'Сервисы', icon: 'pi pi-fw pi-video', url: '/services'
  },
  {
    label: 'Сервисы1', icon: 'pi pi-fw pi-video', url: '/services'
  }
])
const activeItem = ref()
</script>

<style>
@media (min-width: 960px) {
  .p-megamenu-vertical {
    width: 350px
  }
}

.p-menuitem{
  min-height: 40px;
  display: flex;
  width: 100%;
  align-items: center;
  
}

.p-menuitem-active{
  height: 100%;
}

.p-menuitem-content{
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}

.p-menuitem-link{
  width: 100%;
  height: 40px;
  margin: 4px;

}

.p-menuitem-link:hover{
  background: red
}

</style>