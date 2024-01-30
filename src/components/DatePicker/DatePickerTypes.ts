import { Dayjs } from 'dayjs'

export type DatePickerProps = {
  date: Dayjs
  setDate: React.Dispatch<React.SetStateAction<Dayjs>>
}
