import getAuth from './getAuth'
import { UserAuth } from '~/types/auth'

export function defineAuthenticatedEventHandler<T>(handler: (event: any, user?: User) => T | Promise<T>) {
  return defineEventHandler(async event => {
    if (event.node.req.url === '/api/auth/authentication' || event.node.req.url === '/auth'){
      return handler(event)
    } 
    try {
      const user: UserAuth | string | null = await getAuth(event)
      return handler(event, user)
    } catch (err) {
      sendRedirect(event, '/auth')
    }
  })
}