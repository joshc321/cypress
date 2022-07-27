import SwiperCore, { Virtual } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import {IconButton, Typography, Stack
} from '@mui/material';

import moment from 'moment';

import { useState } from 'react';

// Import Swiper styles
import 'swiper/css';
import CalendarTopView from '../components/calendarTopView';

// install Virtual module
SwiperCore.use([Virtual])

function backGroundColor(date, selectedDate)
  {if(date.dayOfYear() === selectedDate.dayOfYear()){
      return '#f0f0f0'
    }
    else{
      return ''
    }
  }

function Test() {
    const [selectedDate, setSelectedDate] = useState(moment().startOf('day'))

    const handleClick = (newDate) => {
        setSelectedDate(newDate)
        console.log(newDate.format())
    }
    

    return(
        <>
            <CalendarTopView weeksPastToday={0} selectedDate={selectedDate} handleClick={handleClick}/>
            <CalendarTopView weeksPastToday={0} selectedDate={selectedDate} handleClick={handleClick}/>

            <IconButton sx={{
                backgroundColor:backGroundColor(moment(), selectedDate)
                }} 
                onClick={() => handleClick(moment().startOf('day'))}>
                <Typography color={''} >{moment().date()}</Typography>
            </IconButton>
        </>
    )
}

export default Test