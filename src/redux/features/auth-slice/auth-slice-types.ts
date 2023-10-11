import { User as FirebaseUser } from 'firebase/auth'

export type AuthState = {
  value: FirebaseUser | null
}

export type AuthStatePayload = FirebaseUser
