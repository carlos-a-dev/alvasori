import { initializeApp, getApps, FirebaseOptions } from 'firebase/app'

export * from 'firebase/app'

export function getEnvConfig (): FirebaseOptions {
  return JSON.parse(process.env.FIREBASE_CONFIG ?? '{}') as FirebaseOptions
}

export function initializeFirebase (config?: FirebaseOptions) {
  const firebaseConfig = getEnvConfig()

  if (config) {
    Object.assign(firebaseConfig, config)
  }

  initializeApp(firebaseConfig)
}

export function isAppInitialized (): boolean {
  return getApps().length > 0
}
