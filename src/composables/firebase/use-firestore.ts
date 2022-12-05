import { getApp } from 'src/composables/firebase/use-firebase'
import { getFirestore, doc, getDoc, setDoc, Firestore, DocumentData, FirestoreDataConverter, addDoc, collection, query, QueryConstraint, getDocs } from 'firebase/firestore'

export * from 'firebase/firestore'
export { isAppInitialized } from 'src/composables/firebase/use-firebase'

const firestoreList = new Map<string, Firestore>()

export function getFs (appName = '[DEFAULT]'): Firestore {
  const firestore = firestoreList.get(appName) ?? getFirestore(getApp(appName))

  if (!firestoreList.has(appName)) {
    firestoreList.set(appName, firestore)
  }

  return firestore
}

// GET
export async function getDocument<T = DocumentData> (
  id: string,
  collection: string,
  converter: FirestoreDataConverter<T> | null = null,
  appName = '[DEFAULT]'
): Promise<T | null> {
  if (converter !== null) {
    const ref = doc(getFs(appName), collection, id).withConverter(converter)
    const docSnap = await getDoc<T>(ref)
    return docSnap.exists() ? docSnap.data() : null
  }

  const ref = doc(getFs(appName), collection, id)
  const docSnap = await getDoc(ref)
  return docSnap.exists() ? docSnap.data() as T : null
}

// SET
export async function setDocument<T = unknown> (
  id: string,
  mycollection: string,
  data: T,
  converter: FirestoreDataConverter<T> | null = null,
  appName = '[DEFAULT]'
): Promise<void> {
  if (converter !== null) {
    const ref = doc(getFs(appName), mycollection, id).withConverter<T>(converter)
    return setDoc<T>(ref, data)
  }

  const ref = doc(getFs(appName), mycollection, id)
  return setDoc(ref, data as unknown)
}

// ADD
export async function addDocument<T = unknown> (
  mycollection: string,
  data: T,
  converter: FirestoreDataConverter<T> | null = null,
  appName = '[DEFAULT]'
) {
  if (converter !== null) {
    const collectionRef = collection(getFs(appName), mycollection).withConverter<T>(converter)
    return addDoc<T>(collectionRef, data)
  }

  const collectionRef = collection(getFs(appName), mycollection)
  return addDoc(collectionRef, data as unknown)
}

export async function getDocuments<T = DocumentData> (
  mycollection: string,
  queryConstraints: QueryConstraint[],
  converter: FirestoreDataConverter<T> | null = null,
  appName = '[DEFAULT]'
) {
  if (converter !== null) {
    const ref = collection(getFs(appName), mycollection).withConverter(converter)
    const q = query(ref, ...queryConstraints)
    return await getDocs(q)
  }

  const ref = collection(getFs(appName), mycollection)
  const q = query(ref, ...queryConstraints)
  return await getDocs(q)
}
