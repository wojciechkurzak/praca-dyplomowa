/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers'
import { Button, Menu } from '@mui/material'
import { useState } from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { DatePickerProps } from './DatePickerTypes'
import { useOutletContext } from 'react-router-dom'
import { ProjectOutlet } from '../../pages/ProjectPage/ProjectPageTypes'

import './DatePicker.scss'

const DatePicker = ({ date, setDate }: DatePickerProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const { currentProject } = useOutletContext<ProjectOutlet>()
  const currentDate = new Date().toISOString().split('T')[0]

  const disabledDates = (dateParam: any) => {
    const dates = dateParam.toISOString().split('T')[0]
    return dates < currentDate
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className='date-picker'>
      <div className='text'>
        {currentProject.sprint.isRunning ? (
          <span>{`${currentProject.sprint.startAt} - ${currentProject.sprint.endAt}`}</span>
        ) : (
          <>
            <span>{`Today - ${date.format('DD/MM/YYYY')}`}</span>
            <Button
              variant='contained'
              className='no-projects-button'
              onClick={handleClick}
            >
              <FaRegCalendarAlt />
            </Button>
          </>
        )}
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className='calendar'
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={date}
            onChange={(newValue) => setDate(newValue)}
            shouldDisableDate={disabledDates}
          />
        </LocalizationProvider>
      </Menu>
    </div>
  )
}

export default DatePicker
