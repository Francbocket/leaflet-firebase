import { envClientSchema } from './envConfig'

export const firebaseConfig = {
  apiKey: envClientSchema.REACT_APP_FIREBASE_API_KEY,
  authDomain: envClientSchema.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: envClientSchema.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: envClientSchema.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envClientSchema.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: envClientSchema.REACT_APP_FIREBASE_APP_ID,
}
