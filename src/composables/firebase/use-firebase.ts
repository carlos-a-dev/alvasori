import { initializeApp, getApps, FirebaseOptions } from 'firebase/app'

export * from 'firebase/app'

export function getEnvConfig (): FirebaseOptions {
  return {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_MEASUREMENT_ID
  }
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
