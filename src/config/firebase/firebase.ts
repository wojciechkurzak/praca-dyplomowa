import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import keys from './firebaseKeys.json'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  ...keys,
}

initializeApp(firebaseConfig)

export const db = getFirestore()
export const auth = getAuth()
