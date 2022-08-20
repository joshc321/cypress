import { useState } from 'react';
import moment from 'moment';

import { Box
} from '@mui/material'

import CalendarTopBar from '../components/calendarTopBar';
import ScheduledServiceList from '../components/scheduledServiceList';
import BottomNavigationBar from '../components/bottomNavigationBar';
import AddButton from '../components/addButton';
import useAuth from '../components/api/useAuth';
import useScheduledServices from '../components/api/useScheduledServices';


export default function Calendar() {
  useAuth()
  //date date
  const [selectedDate, setSelectedDate] = useState(moment().startOf('day'))

  //service data
  const services = useScheduledServices(selectedDate)


  return (
    <>
      <CalendarTopBar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Box sx={{ pt: 15, pb: 8 }}>
        <ScheduledServiceList services={services}/>
      </Box>
      <AddButton linkTo={'/scheduleservice'} />
      <BottomNavigationBar value={1} />
    </>
  );
}