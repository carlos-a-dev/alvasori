import { getApp } from 'src/composables/firebase/use-firebase'
import { getFirestore, doc, getDoc, setDoc, Firestore } from 'firebase/firestore'

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

export async function getDocument (id: string, collection: string, appName = '[DEFAULT]') {
  const docSnap = await getDoc(doc(getFs(appName), collection, id))

  return docSnap.exists() ? docSnap.data() : null
}

export async function setDocument (id: string, collection: string, data: unknown, appName = '[DEFAULT]') {
  await setDoc(doc(getFs(appName), collection, id), data)
}
