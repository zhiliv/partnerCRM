import { db } from '~/server/db'
import { H3Event } from 'h3'
import { Response } from '~/types/query'

export default defineEventHandler(async (event: H3Event) => {
  const params:any = await readBody(event) // Получение параметров запроса
  const response: Response = {} // переменная для получения  результата
  try {
    const optionsWhere = {
      where: {
        id: params.id,
      },
    }
    const count = await sequelize.models[params.table].count(optionsWhere) // получение количества записей с таким наименованием
    if (count === 0) {
      response.status = 202 // установка статуса ответа
      response.typeMessage = 'warning' // установка типа ответа
      response.message = 'Такой записи не существует!' // установка текста ответа
    } else {
      response.status = 200 // установка статуса
      response.message = 'Запись удалена успешно' // установка текста ответа
      response.typeMessage = 'success' // установка типа
      response.data = await sequelize.models[params.table].destroy(optionsWhere) // удаление данных
    }
    return response
  } catch (error: any) {
    const err = getErrorResponse(error) // получение текста ошибки
    throw createError(err)
  }
})
