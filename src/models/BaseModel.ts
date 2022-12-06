import { getDocument, setDocument, FirestoreDataConverter, addDocument, getDocuments, QueryConstraint } from 'src/composables/firebase/use-firestore'

// Helpers to get child class reference
type Constructor<T> = { new (data: unknown): T }
function activator<T> (Type: { new(): T }): T { return new Type() }

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
    return await getDocument<T>(id, $this.documentName, $this.dataConverter)
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
    return (await addDocument<T>($this.documentName, data, $this.dataConverter)).id
  }

  static async getAll<T> (this: Constructor<T>, constraints: QueryConstraint[] = []): Promise<T[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const $this = (this as any)
    const snapshot = await getDocuments<T>($this.documentName, constraints, $this.dataConverter)

    return snapshot.docs.map(doc => doc.data() as T)
  }
}
