import { H3Event } from 'h3'
import { updateItem } from '~/server/utils/helper.js'

export default defineEventHandler(async (event: H3Event) => {
  const params = await readBody(event) // получение параметров
  return await updateItem(params.table, params)
})
