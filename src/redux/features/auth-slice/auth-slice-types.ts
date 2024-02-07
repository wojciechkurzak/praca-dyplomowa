export type AuthState = {
  uid: string | null
  email: string | null
  username: string | null | undefined
  ownProjects: string[]
  sharedProjects: string[]
}
