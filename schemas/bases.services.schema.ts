export default {
  schema: 'bases',
  table: 'services',
  fullPath: 'bases.services',
  short: 'srvcs',
  columns: {
    id: {
      type: 'Number',
      require: true,
      autoIncrement: true,
      name: 'Идентификатор'
    },
    name: {
      type: 'String',
      required: true,
      name: 'Наименование'
    },
    created_date: {
      type: 'Date',
      required: true,
      name: 'Дата создания'
    },
    update_date: {
      type: 'Date',
      required: true,
      name: 'дата обновления'
    }
  }
}