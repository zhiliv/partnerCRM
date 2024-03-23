import { H3Event } from 'h3'
import { updateItem } from '~/server/utils/helper.js'
import { File } from '~/types/organization-old'
import { saveImage, delImage } from '~/server/utils/helper.js'
import { uuid } from 'vue-uuid'

export default defineEventHandler(async (event: H3Event) => {
  const params = await readBody(event) // Получение параметров
  params.information = JSON.stringify(params.information)
  const newImages: File[] = params.images.filter((el: File) => el.isNew) // Получение списка новых изображений
  if(newImages.length) {
    for await(let image of newImages) {
      await saveImage(params.table, params.id, image.fileName, image.dataFile)
    }
  }
  const delImages: File[] = params.images.filter((el: File) => el.isDel) // Получение списка удаляемых изображений
  if(delImages.length) {
    for await(let image of delImages) {
      await delImage(image.path)
    }
  }
  params.images.map((el: any) => {
    if(el.isDel) {
      const index = params.images.findIndex((image: any) => el.uuid === image.uuid)
      params.images.splice(index, 1)
    }
    delete el.dataFile
    delete el.file
    delete el.isNew
    delete el.isDel
    el.path = `img/organizations/${params.id}/${el.fileName}`
    el.id = el.id ? el.id : uuid.v4()
    return el
  })
  params.images = JSON.stringify(params.images)
  return await updateItem(params.table, params)
})