import {H3Event} from 'h3'
import {db} from '~/server/db'
import { QueryResult } from 'pg'

export default defineEventHandler(async (event: H3Event) => {
   
  const params = await getQuery(event)
  console.log("🚀 -> defineEventHandler -> params:", params)
   
  
})