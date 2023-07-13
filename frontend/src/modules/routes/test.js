import moment from 'moment';

import { useState } from 'react';
import { Box, Button, Stack, IconButton } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material'
import Month from '../components/calendar/monthView/month';
import Day from '../components/calendar/dayView/day';
import BottomNavigationBar from '../components/bottomNavigationBar';
import ScrollArrows from '../components/scrollArrows';

function Test() {
    const [selectedDate, setSelectedDate] = useState(moment().startOf('month'));
    const [view, setView] = useState('day');

    const handleChange = (c) => () => {
      if(view === 'month')
        setSelectedDate(moment(selectedDate).add(c,'month'));
      else if(view === 'day')
        setSelectedDate(moment(selectedDate).add(c,'day'));
    }

    const toggleView = () => {
      if(view === 'month')
        setView('day');
      else if(view === 'day')
        setView('month');
    }

    return(
      <Box
        display='flex'
        flex={1}
        flexDirection='column'
        height='100vh'
        pb={9}
      >
        <Stack sx={{pt: 1, px: 2}} flexDirection='row' justifyContent='space-between'>
          <Box>
            <IconButton onClick={toggleView}>
              <ArrowBackIos fontSize='small'/>
            </IconButton>
            <Button onClick={() => setSelectedDate(moment().startOf('month'))}>
              {selectedDate.format("MMMM YYYY")}
            </Button>
          </Box>
          <ScrollArrows onBackArrow={handleChange(-1)} onForwardArrow={handleChange(1)} />
        </Stack>
        {view==='month' ? <Month selectedDate={selectedDate} /> : <Day selectedDate={selectedDate} /> }
        <BottomNavigationBar />
      </Box>
    )
}

export default Test;