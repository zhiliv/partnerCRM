import pg from 'pg'
import color from 'ansis'

const config = useRuntimeConfig()

export const db = new pg.Client({
  host: config.database.host,
  port: config.database.port,
  database: 'partnerCRM',
  user: 'postgres',
  password: '1',
})

try{
  await db.connect()  
}
catch(err: any){
  console.log(color.red('Нет возможности подключиться к базе данных'), color.yellow(err.toString()))
}
