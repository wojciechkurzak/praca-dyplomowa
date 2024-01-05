// import { User as FirebaseUser } from 'firebase/auth'

export type AuthState = {
  uid: string | null
  email: string | null
  username: string | null | undefined
  imageUrl: string | null
}
