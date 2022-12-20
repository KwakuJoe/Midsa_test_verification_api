import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Verification extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public pinNumber: string

  @column()
  public image: string

  @column()
  public dataType: string

  @column()
  public center: string

  @column()
  public merchantKey: string  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
