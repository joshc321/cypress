import moment from 'moment';

import { useState } from 'react';
import CalendarTopBar from '../components/calendarTopBar';
import { Box, Button } from '@mui/material'


function Test() {
    const [selectedDate, setSelectedDate] = useState(moment().startOf('day'))

    return(
        <>
            <CalendarTopBar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            <Box sx={{pt:16}}>
                {selectedDate.format()}
                <Button onClick={() => setSelectedDate(moment(selectedDate).subtract(1,'day').startOf('day'))}>
                  Previous
                </Button>
                <Button onClick={() => setSelectedDate(moment(selectedDate).add(1,'day').startOf('day'))}>
                  Forward
                </Button>
            </Box>
        </>
    )
}

export default Test