import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const params = await readBody(event) // получение параметров
  
  
  // return await updateItem('users', params)
})
