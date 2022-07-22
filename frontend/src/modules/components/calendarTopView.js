import {Button, IconButton, Typography, Stack
} from '@mui/material';

import moment from 'moment';

function weekDays(startDate){

    return Array.from({length: 7}).map((_, index) => moment(startDate).add(index, 'day'))
    
  }
  
  function backGroundColor(date, selectedDate)
  {
    if(date.dayOfYear() === moment().dayOfYear()){
      return 'primary.dark'
    }
    else if(date.dayOfYear() === selectedDate.dayOfYear()){
      return '#f0f0f0'
    }
    else{
      return ''
    }
  }
  
  function DateButton({date, selectedDate, handleClick})
  {    
    return(
      <IconButton sx={{
        backgroundColor:backGroundColor(date, selectedDate)
        }} 
        key={date} onClick={() => handleClick(date.startOf('day'))}>
        <Typography color={date.dayOfYear() === moment().dayOfYear() ? 'common.white' : ''} >{date.date()}</Typography>
      </IconButton>
    )
  }

function CalendarTopView({weeksPastToday, selectedDate, handleClick})
{
  const weekList = weekDays(moment().add(weeksPastToday, 'weeks').startOf('week'));
  const days = moment.weekdaysShort()

  return(
    <Stack key={weeksPastToday} flexDirection='row' justifyContent='space-around' alignItems='baseline'>
      {weekList.map((date, index) => (
      <Stack key={date} direction='column' alignItems='center'>
        <Typography
          sx={{
            fontFamily: "Proxima Nova Alt",
            fontWeight: "fontWeightLight",
            fontSize: 13,
          }}
        >
          {days[index]}
        </Typography>
        <DateButton date={date} selectedDate={selectedDate} handleClick={handleClick}/>
      </Stack>
      ))}
    </Stack>
  )
}

export default CalendarTopView