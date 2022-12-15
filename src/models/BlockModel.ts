import { QueryDocumentSnapshot, SnapshotOptions, DocumentData, where, limit } from 'src/composables/firebase/use-firestore'
import BaseModel from './BaseModel'

export interface BlockInterface {
  id?: string
  enabled: boolean
  name: string
  description: string
  content: string
}

export default class BlockModel extends BaseModel implements BlockInterface {
  protected static documentName = 'blocks'

  enabled = true
  name = ''
  description = ''
  content = ''

  protected static dataConverter = {
    toFirestore (data: BlockModel): DocumentData {
      delete data.id
      return { ...data }
    },
    fromFirestore (
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): BlockModel {
      const data = snapshot.data(options)
      data.id = snapshot.id

      return BlockModel.create(data)
    }
  }

  static async isNameAvailable (name:string): Promise<boolean> {
    return (await BlockModel.getAll([where('name', '==', name), limit(1)])).length === 0
  }

  asString () {
    return this.content
  }
}
