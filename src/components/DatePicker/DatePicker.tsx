import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers'
import { Button, Menu } from '@mui/material'
import { useState } from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa'

import './DatePicker.scss'

const DatePickerValue = () => {
  const [value, setValue] = useState<Dayjs | null>(dayjs().add(7, 'day'))
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className='date-picker'>
      <div className='text'>
        <span>{`Today - ${value ? value!.format('DD-MM-YYYY') : null}`}</span>
        <Button
          variant='contained'
          className='no-projects-button'
          onClick={handleClick}
        >
          <FaRegCalendarAlt />
        </Button>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className='calendar'
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </LocalizationProvider>
      </Menu>
    </div>
  )
}

export default DatePickerValue
