export default {
  schema: 'accesses',
  table: 'users',
  fullPath: `accesses.users`,
  short: 'usr',
  columns:{
    id: {
      type: 'Number',
      required: true,
      autoInrement: true,
      title: 'Идентификатор'
    },
    name: {
      type: 'String',
      required: true,
      title: 'Имя пользователя'
    },
    password_hash: {
      type: 'String',
      required: true,
      title: 'Хэш значение пароля'
    },
    created_date: {
      type: 'Date',
      required: true,
      title: 'Дата создания записи'
    },
    update_date: {
      type: 'Date',
      name: 'Дата обновления записи'
    },
    email: {
      type: 'String',
      required: true,
      name: 'Адрес электронной почты'
    }  
  }
  
}