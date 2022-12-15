import { getApp } from 'src/composables/firebase/use-firebase'
import { getFirestore, doc, getDoc, setDoc, Firestore, DocumentData, FirestoreDataConverter, addDoc, collection, query, QueryConstraint, getDocs, deleteDoc } from 'firebase/firestore'

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
  if (converter === null) {
    const docSnap = await getDoc(doc(getFs(appName), collection, id))
    return docSnap.exists() ? docSnap.data() as T : null
  } else {
    const docSnap = await getDoc<T>(doc(getFs(appName), collection, id).withConverter(converter))
    return docSnap.exists() ? docSnap.data() as T : null
  }
}

// SET
export async function setDocument<T = unknown> (
  id: string,
  mycollection: string,
  data: T,
  converter: FirestoreDataConverter<T> | null = null,
  appName = '[DEFAULT]'
): Promise<void> {
  return converter === null
    ? setDoc(doc(getFs(appName), mycollection, id), data as unknown)
    : setDoc<T>(doc(getFs(appName), mycollection, id).withConverter<T>(converter), data)
}

// ADD
export async function addDocument<T = unknown> (
  mycollection: string,
  data: T,
  converter: FirestoreDataConverter<T> | null = null,
  appName = '[DEFAULT]'
) {
  return converter === null
    ? addDoc(collection(getFs(appName), mycollection), data as unknown)
    : addDoc<T>(collection(getFs(appName), mycollection).withConverter<T>(converter), data)
}

// GET ALL
export async function getDocuments<T = DocumentData> (
  mycollection: string,
  queryConstraints: QueryConstraint[],
  converter: FirestoreDataConverter<T> | null = null,
  appName = '[DEFAULT]'
) {
  return converter === null
    ? getDocs(query(collection(getFs(appName), mycollection), ...queryConstraints))
    : getDocs(query(collection(getFs(appName), mycollection).withConverter(converter), ...queryConstraints))
}

// DELETE
export async function deleteDocument (
  id: string,
  mycollection: string,
  appName = '[DEFAULT]'
): Promise<void> {
  return deleteDoc(doc(getFs(appName), mycollection, id))
}
