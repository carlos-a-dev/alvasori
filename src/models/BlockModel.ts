import { QueryDocumentSnapshot, SnapshotOptions, DocumentData } from 'src/composables/firebase/use-firestore'
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

  test = 'this is a test'

  protected static dataConverter = {
    toFirestore (data: BlockModel): DocumentData {
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

  asString () {
    return this.content
  }
}
//
