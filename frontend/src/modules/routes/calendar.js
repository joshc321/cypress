import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';

import { Button, Fab, Box, Stack, IconButton, Typography, 
  Paper,
} from '@mui/material'

import CalendarTopBar from '../components/calendarTopBar';
import ScheduledServiceList from '../components/scheduledServiceList';
import BottomNavigationBar from '../components/bottomNavigationBar';
import AddButton from '../components/addButton';


export default function Calendar() {

  //date date
  const [selectedDate, setSelectedDate] = useState(moment().startOf('day'))

  //service data
  const [services, setServices] = useState(dates)


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




const dates = [
  {
    _id: 'a098d7sf0asdf',
    date: moment(),
    service: 'doing some things',
    notes: 'they got stuff',
    estimate: '322',
    company: '0as89df7a98',
    customer: 
    {
      _id: 'a9s8df70a9d',
      first: 'Coral',
      last: 'Raymond',
      address: '53 West Mammoth Court Greenwood, SC 29646'
    }
  },
  {
    _id: 'ldaf80d0a98d7f',
    date: moment(),
    service: 'doing some more things',
    notes: 'they got stuff',
    estimate: '322',
    company: '0as89df7a98',
    customer: 
    {
      _id: 'asdf9aspdf087',
      first: 'Elin',
      last: 'Stamp',
      address: '90C Cedar St. Amarillo, TX 79106'
    }
  },
  {
    _id: 'aasd8sodify0ad',
    date: moment(),
    service: 'doing some things',
    notes: 'they got stuff',
    estimate: '322',
    company: '0as89df7a98',
    customer: 
    {
      _id: 'a098ds7f0a9',
      first: 'Dominykas ',
      last: 'Crawford',
      address: '9948 Henry St. Bristow, VA 20136'
    }
  },
  {
    _id: 'a7se8dw6fy345',
    date: moment(),
    service: 'doing some things',
    notes: 'they got stuff',
    estimate: '322',
    company: '0as89df7a98',
    customer: 
    {
      _id: '0q19834a98wsd7yf',
      first: 'Hugo',
      last: 'Woodward',
      address: '9316 North Inverness Road Leland, NC 28451'
    }
  },
  {
    _id: 'a098d7sf0asdf',
    date: moment(),
    service: 'doing some things',
    notes: 'they got stuff',
    estimate: '322',
    company: '0as89df7a98',
    customer: 
    {
      _id: 'a9s8df70a9d',
      first: 'Coral',
      last: 'Raymond',
      address: '53 West Mammoth Court Greenwood, SC 29646'
    }
  },
  {
    _id: 'ldaf80d0a98d7f',
    date: moment(),
    service: 'doing some more things',
    notes: 'they got stuff',
    estimate: '322',
    company: '0as89df7a98',
    customer: 
    {
      _id: 'asdf9aspdf087',
      first: 'Elin',
      last: 'Stamp',
      address: '90C Cedar St. Amarillo, TX 79106'
    }
  },
  {
    _id: 'aasd8sodify0ad',
    date: moment(),
    service: 'doing some things',
    notes: 'they got stuff',
    estimate: '322',
    company: '0as89df7a98',
    customer: 
    {
      _id: 'a098ds7f0a9',
      first: 'Dominykas ',
      last: 'Crawford',
      address: '9948 Henry St. Bristow, VA 20136'
    }
  },
  {
    _id: 'a7se8dw6fy345',
    date: moment(),
    service: 'doing some things',
    notes: 'they got stuff',
    estimate: '322',
    company: '0as89df7a98',
    customer: 
    {
      _id: '0q19834a98wsd7yf',
      first: 'Hugo',
      last: 'Woodward',
      address: '9316 North Inverness Road Leland, NC 28451'
    }
  },
]