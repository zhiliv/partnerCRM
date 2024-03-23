import * as bcrypt from 'bcrypt'
// const config = useRuntimeConfig() // получение конфигурации

/*
 * Получение соли для хэша
 * @function getSalt
 */
export const getSalt = async () => {
  return await bcrypt.genSalt(11)
}

/*
 * Получение хэша пароля
 * @function getHashPassword
 * @param {String} password - Значение пароля
 */
export const getHashPassword = async (password: string) => {
  const salt = await getSalt()
  return password && salt ? await bcrypt.hash(password, salt) : false
}
