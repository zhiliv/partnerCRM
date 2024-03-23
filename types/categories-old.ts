/* Интерфейс категории оффера */
export interface Category {
  description: string | null // Описание категории
  id: number |  null | undefined // Идентификатор
  asActive: boolean | null | undefined // Статус активности записи в списке
  name: string | null // Наименование категории
}