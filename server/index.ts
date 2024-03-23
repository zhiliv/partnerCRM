import * as fs from 'fs'

const arrImgDir = ['organizations', 'offers'] // список директорий для изображений
arrImgDir.forEach(dir => {
  if (!fs.existsSync(`public/img/${dir}`)) fs.mkdirSync(`public/img/${dir}`) // проверка наличия директории и создание если она отсутствует
})

