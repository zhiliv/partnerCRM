import { db } from '~/server/db'
import { H3Event } from 'h3'
import { Response } from '~/types/query'
import { getErrorResponse } from '~/server/utils/helper.js'

export default defineEventHandler(async (event: H3Event) => {
  const params:any = await readBody(event) // Получение параметров запроса
  const response: Response = {} // переменная для получения  результата
  try {
    const optionsWhere = {
      where: {
        id: params.id,
      },
    }
    const count = await sequelize.models.type_profit.count(optionsWhere) // получение количества записей с таким наименованием
    if (count === 0) {
      response.status = 202 // установка статуса ответа
      response.typeMessage = 'warning' // установка типа ответа
      response.message = 'Такой записи не существует!' // установка текста ответа
    } else {
      const linkCount = await sequelize.models.offers.count({ where: { name: params.id } }) // Получение количества связанных записей
      if (linkCount > 0) {
        response.status = 202 // установка статуса ответа
        response.typeMessage = 'warning' // установка типа ответа
        response.message = 'Невозможно удалить, так как с этой записью связанны офферы!' // установка текста ответа
        return response
      }
      response.status = 200 // установка статуса
      response.message = 'Запись удалена успешно' // установка текста ответа
      response.typeMessage = 'success' // установка типа
      response.data = await sequelize.models.cpa.destroy(optionsWhere) // удаление данных
    }
    return response
  } catch (error: any) {
    const err = getErrorResponse(error) // получение текста ошибки
    throw createError(err)
  }
})
