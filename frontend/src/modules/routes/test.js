import {Button, IconButton, Typography, Stack
} from '@mui/material';

import moment from 'moment';

import { useState } from 'react';

import CalendarTopView from '../components/calendarTopView';


function Test() {

    const [buttonVar, setButtonVar] = useState("contained")

    const [selectedDate, setSelectedDate] = useState(moment().startOf('day'))

    const [slides, setSlides] = useState(
        Array.from({ length: 1 }).map((_, index) => <CalendarTopView weeksPastToday={index} selectedDate={selectedDate} handleClick={setSelectedDate}/>)
      );

    const [buttons, setButtons] = useState(
        Array.from({ length: 1 }).map((_, index) => <Button variant={buttonVar}>test</Button>)
    );


    const handleClick = (newDate) => {
        setSelectedDate(newDate)
        const newSlides = slides.map(obj => {

            console.log(obj)

            return obj;

        })

        setSlides(newSlides)
    }

    const handleClick2 = () => {
        console.log("changed")
        if(buttonVar === "contained")
        {
            setButtonVar("outlined")
        }
        else
        {
            setButtonVar("contained")
        }
    }

    return(
        <>

            <CalendarTopView weeksPastToday={0} selectedDate={selectedDate} handleClick={handleClick} />

            
            {slides.map((slideContent, index) => (
                <div key={index}>
                    {slideContent}
                </div>
            ))}
          

            <Button onClick={handleClick2} variant={"contained"}>
                view
            </Button>

            {buttons.map((buttonContent, index) => (
                <div key={index}>
                    {buttonContent}
                </div>
            ))}
            <Button variant={buttonVar}>test</Button>

        </>
    )
}

export default Test