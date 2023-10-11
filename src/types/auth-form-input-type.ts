import { Dispatch } from 'react'

export type AuthFormInputType = {
  label: string
  type: string
  value: string
  onChange: Dispatch<string>
}
