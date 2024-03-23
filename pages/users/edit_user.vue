<template>
  <div class="p-2">
    <div class="shadow-md shadow-zinc-300 p-2 rounded-lg border">
      <app-input
        :disabled="true"
        class="standart w-full input"
        label="Имя пользователя"
        v-model="data.name"
      />
    </div>
    <div class="shadow-md shadow-zinc-300 p-2 rounded-lg border mt-2">
      <app-input
        class="standart w-full input"
        label="Электронная почта"
        v-model="data.email"
      />
      <app-input
        class="standart w-full input"
        label="Новый пароль"
        type="password"
        v-model="data.new_password"
      />
      <app-input
        class="standart w-full input"
        label="Подтверждение пароля"
        type="password"
        v-model="data.confirm_password"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/users-store'
const emit = defineEmits(['valid', 'data']) // События
const store = useUserStore() // Создание нового стора
const id: any = useCookie('user_id') // Получение идентификатора пользователя из куки

/**
* Данные формы
* @member {String} name - Имя пользователя
* @member {String} new_password - Новый пароль
* @member {String} confirm_password - Подтверждение пароля
* @member {String} email - Электронная почта
*/
const data = ref({
  name: null,
  new_password: null,
  confirm_password: null,
  email: null,
  id: null,
})

const isValid = ref({
  name: false,
  new_password: false,
  confirm_password: false,
  email: false,
  result: false
})


data.value.id = id.value
onMounted(async () => {
  const response = await store.getRecord(id.value) // Получение данных о пользователе
  data.value.name = response.value.name
  data.value.email = response.value.email

})

// const getUser = await store.getRecord(id) // Получение данных о пользователе
// data.value = getUser.data.value // Полученные данных пользователя

/**
* Наблюдатель для установки валидации
*/
watch(data.value, (newVal: any) => {
  isValid.value.name = !!(newVal.name && newVal.name.length && newVal.name.length > 4) // Установка валидации для поля "Имя пользователя"
  if(!newVal.new_password && !newVal.confirm_password) {
    isValid.value.new_password = true
    isValid.value.confirm_password = true
  }
  else if(newVal.new_password && newVal.new_password.length > 8) {
    isValid.value.new_password = true
    if(!newVal.confirm_password) isValid.value.confirm_password = false
    else if(newVal.confirm_password && newVal.confirm_password === newVal.new_password) isValid.value.confirm_password = true
  }
  if(!newVal.email) isValid.value.email = false
  else if(newVal.email && /^\S+@\S+\.\S+$/.test(newVal.email)) isValid.value.email = true
  else isValid.value.email = false
  isValid.value.result = getValidForm(isValid.value)

  emit('valid', { save: !isValid.value.result })
  emit('data', data.value)
})

</script>
~/stores/default~/stores-old/users-store