import { Dispatch } from 'react'

export type AuthFormInputProps = {
  label: string
  type: string
  value: string
  onChange: Dispatch<string>
  errorMessage?: string | null
}
