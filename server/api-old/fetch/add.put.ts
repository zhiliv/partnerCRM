import { db } from '~/server/db'
import { Response } from '~/types/query'
import { getErrorResponse } from '~/server/utils/helper.js'

export default defineEventHandler(async event => {
  const params = await readBody(event) // параметры запроса
  const response: Response = {} // результативный ответ
  try {
    const optionsWhere = {
      where: {
        name: params.name,
      },
    }
    const count = await sequelize.models[params.table].count(optionsWhere) // получение количества записей с таким наименованием
    if(params.uniq && count > 0) {
      response.status = 217 // установка статуса ответа
      response.typeMessage = 'warning' // тип сообщения
      response.message = 'Запись с таким наименование уже существуют' // установка текста сообщения
    } else {
      response.status = 200 // установка статуса ответа
      response.message = 'Запись создана успешно' // установка сообщения ответа
      response.typeMessage = 'success' // тип сообщения
      response.data = await sequelize.models[params.table].create(params) // возврат результата добавления
    }
    return response
  } catch (error: any) {
    const err = getErrorResponse(error) // Формирование ошибки
    throw createError(err)
  }
})
