import { getDocument, setDocument, FirestoreDataConverter, addDocument, getDocuments, QueryConstraint } from 'src/composables/firebase/use-firestore'

type Constructor<T> = { new (data: unknown): T }
function activator<T> (Type: { new(): T }): T {
  return new Type()
}

export default abstract class BaseModel {
  id?: string

  protected static documentName: string

  // Firestore data converter
  protected static dataConverter: FirestoreDataConverter<unknown> | null = null

  static create<T extends BaseModel> (this: Constructor<T>, data: unknown): T {
    const newModel: T = activator(this as never)
    Object.assign(newModel, data)
    return newModel
  }

  static async get<T> (this: Constructor<T>, id: string): Promise<T | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const $this = (this as any)
    const data = await getDocument<typeof $this>(id, $this.documentName, $this.dataConverter)
    if (data !== null) {
      return data
    }

    return null
  }

  static async set<T> (this: Constructor<T>, id: string, data: T): Promise<T | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const $this = (this as any)
    await setDocument<T>(id, $this.documentName, data, $this.dataConverter)
    return $this.get(id)
  }

  static async add<T> (this: Constructor<T>, data: T): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const $this = (this as any)
    const ref = await addDocument<T>($this.documentName, data, $this.dataConverter)
    return ref.id
  }

  static async getAll<T> (this: Constructor<T>, constraints: QueryConstraint[] = []) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const $this = (this as any)
    return await getDocuments($this.documentName, constraints, $this.dataConverter)
  }
}
