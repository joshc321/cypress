import React from 'react'
import SwipeableViews from 'react-swipeable-views';
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';
import { Button, Fab, Box, Stack, IconButton, Typography, 
    Paper, TextField, List, ListItem, ListItemButton,
    ListItemText,Divider
} from '@mui/material'
import { ArrowBackIos, ArrowForwardIos, Add } from '@mui/icons-material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import Moment from 'react-moment'
import moment from 'moment';
import { useState } from 'react'
import AdapterMoment from '@mui/lab/AdapterMoment'
import BottomNavigationBar from '../components/bottomNavigationBar';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import useWindowDimensions from '../components/useWindowDimensions';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

function weekDays(startDate){
  let days = []
  for(let i = 0; i<7; i++){
    days.push(moment(startDate).add(i, 'day'));
  }
  return days
}

export default function Calend(){
  const [index, setIndex] = useState(0);
  const [listIndex, setListIndex] = useState(0);
  const [selected, setSelected] = useState(moment().startOf('day'))
  const { height, width } = useWindowDimensions()

  const handleChangeIndex = newIndex => {
    setIndex(newIndex)
    if(newIndex > index){
      setSelected(selected.add(1,'week').startOf('day'))
    }
    else{
      setSelected(selected.subtract(1,'week').startOf('day'))
    }
  }

  const handleListChangeIndex = newIndex => {
    setListIndex(newIndex)
    if(newIndex > listIndex){
      if(selected.day() == 6){
        setIndex(index + 1)
      }
      setSelected(selected.add(1,'day').startOf('day'))
    }
    else{
      if(selected.day() == 0){
        setIndex(index - 1)
      }
      setSelected(selected.subtract(1,'day').startOf('day'))
    }
  }

  const changeIndex = dir => {
    if(dir > 0){
      setIndex(index + 1)
      setSelected(selected.add(1,'week').startOf('day'))
    }
    else if(dir < 0){
      setIndex(index - 1)
      setSelected(selected.subtract(1,'week').startOf('day'))
    }
  }

  const handleClick = date => {
    setSelected(date);
    console.log(date.startOf('day'))
    console.log(selected)
  }

  const backGroundColor = date => {
    if(date.dayOfYear() === moment().dayOfYear()){
      return 'primary.dark'
    }
    else if(date.dayOfYear() === selected.dayOfYear()){
      return '#f0f0f0'
    }
    else{
      return ''
    }
  }
  const homeIndex = () => {
    setIndex(0)
    setSelected(moment().startOf('day'))
  }

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => console.info('swipe action triggered')}>
        <Box
          sx={{
            height: '100%',
            backgroundColor: 'success.dark',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
          }}
        >
          <Typography
            color={'common.white'}
          >
            Accept
          </Typography>
        </Box>
      </SwipeAction>
    </LeadingActions>
  );
  
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => console.info('swipe action triggered')}
      >
        <Box
          sx={{
            height: '100%',
            backgroundColor: 'error.dark',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
          }}
        >
          <Typography
            color={'common.white'}
          >
            Delete
          </Typography>
        </Box>
      </SwipeAction>
    </TrailingActions>
  );

  const slideRender = (params) => {
    const {index, key} = params;
    const weekList = weekDays(moment().add(index, 'weeks').startOf('week'));
    const days = moment.weekdaysShort()
    return(
      <Stack key={key} flexDirection='row' justifyContent='space-around' alignItems='baseline'>
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
          <IconButton sx={{
              backgroundColor:(backGroundColor(date))
              }} 
              key={date} onClick={() => handleClick(date.startOf('day'))}>
            <Typography color={date.dayOfYear() === moment().dayOfYear() ? 'common.white' : ''} >{date.date()}</Typography>
          </IconButton>
        </Stack>
        ))}
      </Stack>
    )
  }

  const listSlideRenderer = (params) => {
    const {index, key} = params;
    return(
      <Box key={key} sx={{ minHeight: height - 184 }}>
        <List>
          {dates.map(({date, time, description, first, last, address}, index2) => (
              
                  <ListItem key={index2} sx={{ p: 0 }}>
                    <ListItemButton
                      onClick={()=>console.log(`Going to customer page ${index2}`)}
                    >
                      <ListItemText
                        primary={
                          <div>
                            <Typography
                              sx={{
                                fontFamily: "Proxima Nova Alt",
                                fontWeight: "fontWeightThin",
                                fontSize: 13,
                              }}
                            >
                              {`${address} ${selected.format('MMMM Do, YYYY [at] h:mm a')}`}
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "Proxima Nova Alt",
                                fontWeight: "fontWeightBold",
                                fontSize: 18,
                              }}
                            >
                              {first} {last}
                            </Typography>
                          </div>
                        }
                        secondary={
                          <Typography
                            sx={{
                              fontFamily: "Proxima Nova Alt",
                              fontWeight: "fontWeightLight",
                              fontSize: 13,
                            }}
                          >
                            {date.format('MMMM Do, YYYY [at] h:mm a')}
                          </Typography>
                        }
                      />
                      <ArrowForwardIos />
                    </ListItemButton>
                  </ListItem>
            ))}
        </List>
      </Box>
    )
  }

  return(
    <div>
        <Paper 
          square={true}
          sx={{
            position: "fixed",
            zIndex: "tooltip",
            width: "100%",
            pb:2
          }}
        >
          <Stack sx={{pt: 2, px: 2}} flexDirection='row' justifyContent='space-between'>
            <Button onClick={() => homeIndex()}>{selected.format("MMMM YYYY")}</Button>
            <Box>
              <IconButton onClick={() => changeIndex(-1)}>
                <ArrowBackIos fontSize='small'/>
              </IconButton>
              <IconButton onClick={() => changeIndex(1)}>
                <ArrowForwardIos fontSize='small' />
              </IconButton>
            </Box>
          </Stack>
          <VirtualizeSwipeableViews
            enableMouseEvents
            index={index}
            onChangeIndex={handleChangeIndex}
            slideRenderer={slideRender}
          />
        </Paper>
        <Box sx={{ pt: 15, pb: 8 }}>
          <VirtualizeSwipeableViews 
            enableMouseEvents
            index={listIndex}
            onChangeIndex={handleListChangeIndex}
            slideRenderer={listSlideRenderer}
          />
          {/* <SwipeableList
            fullSwipe={false}
            type={Type.IOS}
          >
              {dates.map(({date, time, description, first, last, address}, index) => (
                <SwipeableListItem
                  key={index}
                  leadingActions={leadingActions()}
                  trailingActions={trailingActions()}
                > 
                    <ListItem sx={{ p: 0 }}>
                      <ListItemButton
                        onClick={()=>console.log('clicked')}
                      >
                        <ListItemText
                          primary={
                            <div>
                              <Typography
                                sx={{
                                  fontFamily: "Proxima Nova Alt",
                                  fontWeight: "fontWeightThin",
                                  fontSize: 13,
                                }}
                              >
                                {address}
                              </Typography>
                              <Typography
                                sx={{
                                  fontFamily: "Proxima Nova Alt",
                                  fontWeight: "fontWeightBold",
                                  fontSize: 18,
                                }}
                              >
                                {first} {last}
                              </Typography>
                            </div>
                          }
                          secondary={
                            <Typography
                              sx={{
                                fontFamily: "Proxima Nova Alt",
                                fontWeight: "fontWeightLight",
                                fontSize: 13,
                              }}
                            >
                              {date.format('MMMM Do, YYYY [at] h:mm a')}
                            </Typography>
                          }
                        />
                        <ArrowForwardIos key={index + "arrowButton"} />
                      </ListItemButton>
                    </ListItem>
                </SwipeableListItem>
              ))}
          </SwipeableList> */}
        </Box>
        <Fab
          onClick={() => console.log('clicked')}
          color="primary"
          sx={{
            position: "fixed",
            bottom: 86,
            right: 16,
          }}
        >
          <Add />
        </Fab>
        <BottomNavigationBar />
      </div>
  )
}


const dates = [
  {
    date: moment(),
    time: '12:34',
    description: 'some stuff',
    first: 'some name',
    last: 'yo',
    address: '023 address cypress CA'
  },
  {
    date: moment(),
    time: '12:40',
    description: 'some other',
    first: 'what',
    last: 'di',
    address: '1234 some random address CA'
  },
  {
    date: moment(),
    time: '12:34',
    description: 'some stuff',
    first: 'some name',
    last: 'yo',
    address: '023 address cypress CA'
  },
  {
    date: moment(),
    time: '12:40',
    description: 'some other',
    first: 'what',
    last: 'di',
    address: '1234 some random address CA'
  },
]








// function weeksList(length){
//   const date = moment()
//   let weeks = [weekDays(date.startOf('weeks'))]
//   for(let i = 1; i <= length; i++){
//     weeks.unshift(weekDays(moment(date).subtract(i, 'weeks').startOf('week')))
//     weeks.push(weekDays(moment(date).add(i, 'weeks').startOf('week')))
//   }
//   return weeks
// }

// export default function Calend(){
//   const [prevWeekStart, setPrevWeekStart] = useState(moment().subtract(1,'weeks').startOf('week'))
//   const [weekStart, setWeekStart] = useState(moment().startOf('weeks'))
//   const [nextWeekStart, setNextWeekStart] = useState(moment().add(1, 'weeks').startOf('week'))

//   const [prevWeek, setPrevWeek] = useState(weekDays(prevWeekStart))
//   const [week, setWeek] = useState(weekDays(weekStart))
//   const [nextWeek, setNextWeek] = useState(weekDays(nextWeekStart))

//   const [weeks, setWeeks] = useState(weeksList(1))

//   const [selectedDate, setSelectedDate] = useState(moment().add(1, 'weeks'))
//   const [scrollIndex, setScrollIndex] = useState({
//     current: (weeks.length - 1) / 2,
//     previous: 1
//   })
//   const [weeks2, setWeeks2] = useState(weeksList(1))
//   const [value, setValue] = useState(new Date())

//   const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
//   const scroll = () => {
//     console.log(scrollIndex)
//   }
//   const handleChange = index => {
//     if(index - scrollIndex.current > 0){
//       console.log('scrolled right');
//       if(index === weeks2.length - 1){
//         weeks2.push(weekDays(moment(weeks2[weeks2.length - 1][0]).add(1, 'weeks').startOf('week')))
//       }
//     }else{
//       console.log('scrolled left')
//     }
//     setScrollIndex({
//       current: index,
//       previous: scrollIndex.current
//     })
//   }

//   const handleDateClick = date => {
//     setSelectedDate(date)
//     console.log(date)
//   }

//   return(
//     <div>
//       <Paper sx={{pb:2}}>
//         <Stack sx={{pt: 2, px: 2}} flexDirection='row' justifyContent='space-between'>
//           <Button>January 2022</Button>
//           <Box>
//             <IconButton>
//               <ArrowBackIos fontSize='small'/>
//             </IconButton>
//             <IconButton>
//               <ArrowForwardIos fontSize='small' />
//             </IconButton>
//           </Box>
//         </Stack>
//         <LocalizationProvider dateAdapter={AdapterMoment}>
//           <StaticDatePicker
//             displayStaticWrapperAs="desktop"
//             openTo="day"
//             views={['day']}
//             value={value}
//             showDaysOutsideCurrentMonth={true}
//             onChange={(newValue) => {
//               setValue(newValue);
//             }}
//             renderInput={(params) => <TextField {...params} />}
//           />
//         </LocalizationProvider>
//         <SwipeableViews disableLazyLoading index={scrollIndex.current} enableMouseEvents onChangeIndex={handleChange}>
//           {weeks2.map((weekList, index) => (
//             <Stack key={index} flexDirection='row' justifyContent='space-around' alignItems='baseline'>
//             {weekList.map((date, index) => (
//               <Stack key={date} direction='column' alignItems='center'>
//                 <Typography
//                   sx={{
//                     fontFamily: "Proxima Nova Alt",
//                     fontWeight: "fontWeightLight",
//                     fontSize: 13,
//                   }}
//                 >
//                   {days[index]}
//                 </Typography>
//                 <IconButton sx={{
//                     backgroundColor:(date.dayOfYear() === moment().dayOfYear() ? 'primary.dark' : date === selectedDate ? '#f0f0f0' : '')
//                     }} 
//                     key={date} onClick={() => handleDateClick(date)}>
//                   <Typography color={date.dayOfYear() === moment().dayOfYear() ? 'common.white' : ''} >{date.date()}</Typography>
//                 </IconButton>
//               </Stack>
//             ))}
//           </Stack>
//           ))}
//         </SwipeableViews>
//       </Paper>
//       <Button onClick={scroll}>Set 1</Button>
//     </div>
//   )
// }



// import FullCalendar, { formatDate } from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import listPlugin from '@fullcalendar/list';
// import interactionPlugin from '@fullcalendar/interaction'
// import { INITIAL_EVENTS, createEventId } from '../components/demo-data/appointments'
// import { Box, Typography } from '@mui/material'
// import { useState } from 'react'
// import Kalend, { CalendarView } from 'kalend' // import component
// import 'kalend/dist/styles/index.css'; // import styles

// export default function Calendar(){
//     const [state, setState] = useState({
//         weekendsVisible: true,
//         currentEvents: []
//     })
//     const handleDateSelect = (selectInfo) => {
//         let title = prompt('Please enter a new title for your event')
//         let description = prompt('Please enter a description for your event')
//         let calendarApi = selectInfo.view.calendar
    
//         calendarApi.unselect() // clear date selection
    
//         if (title) {
//           calendarApi.addEvent({
//             id: createEventId(),
//             title,
//             start: selectInfo.startStr,
//             end: selectInfo.endStr,
//             allDay: selectInfo.allDay,
//             description
//           })
//         }
//       }
//     const handleEventClick = (clickInfo) => {
//         console.log(clickInfo.event.extendedProps.description)
//         if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//             clickInfo.event.remove()
//         }
//     }
//     const handleEvents = (events) => {
//         setState({
//           ...state, currentEvents: events
//         })
//       }
      
//     return(
//         <Box
//   style={{
//     height: '100vh'
//   }}
// >
//     <Kalend
//         onEventClick={(event) => {
//           console.log(event)
//         }}
//         onNewEventClick={(event) => {
//             console.log(event)
//         }}

//         events={events}
//         timeFormat={'12'}
//         initialDate={new Date().toISOString()}
//         hourHeight={30}
//         weekDayStart={'Sunday'}
//         initialView={CalendarView.MONTH}
//         disabledViews={[CalendarView.DAY]}
//       />
// </Box>
//     )
    
// }

// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   )
// }

// const events = {
//     '01-12-2021': [
//         {
//         id: 1,
//         startAt: '2021-12-01T18:00:00.000Z',
//         endAt: '2021-12-01T19:00:00.000Z',
//         summary: 'test',
//         color: 'blue',
//         }
//     ],
//     '21-12-2021': [
//         {
//         id: 2,
//         startAt: '2021-12-21T18:00:00.000Z',
//         endAt: '2021-12-21T19:00:00.000Z',
//         summary: 'test',
//         color: 'blue',
//         }
//     ]
// }