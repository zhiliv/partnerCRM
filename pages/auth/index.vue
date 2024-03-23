<template>
  <div class="relative flex flex-col h-screen overflow-hidden">
    <div class="w-full p-8 m-auto rounded-md shadow-2xl ring-2 lg:max-w-xl">
      <div class="space-y-4">
        <div>
          <label for="username">Имя пользователя</label>
          <InputText type="text" class="w-full" aria-describedby="username-help" v-model="authData.login" />
        </div>
        <div>
          <Password :feedback="false" class="w-full" inputClass="w-full" v-model="authData.password" />
        </div>
        <div class="w-full">
          <Button label="Войти" severity="success" class="w-full" :disabled="disabledAuth" @click="auth" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

/* Установка шаблона */
definePageMeta({
  layout: 'clean'
})

useHead({
  title: 'Авторизация'
})

const authData = reactive({ login: '', password: '' }) // Модель данных формы

/* Вычисление активности кнопки "Войти" */
const disabledAuth = computed(() => {
  return !authData.login || !authData.password
})

/**
 * Авторизация
 * @function auth
 */
async function auth() {
  const { data: isAuth, error } = await useFetch('api/auth/authentication', { method: 'POST', body: authData }) // получение данных списка
  if(error.value) showToast({ message: error.value.data.message, type: 'warning' })
  else window.location.href = '/' // редирект на страницу 
}

onMounted(() => {
  /* Отслеживание нажатия кнопки "Enter" */
  document.body.addEventListener('keydown', (event) => {

    //if(event.key === 'Enter') auth()
  })
})


</script>
