import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import keys from './firebaseKeys.json'

const firebaseConfig = {
  ...keys,
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
