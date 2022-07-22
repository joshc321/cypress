import React, { useRef, useState, useEffect } from 'react';
import SwiperCore, { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import moment from 'moment';

import { Button, Fab, Box, Stack, IconButton, Typography, 
  Paper, TextField, List, ListItem, ListItemButton,
  ListItemText,Divider
} from '@mui/material'

import { ArrowBackIos, ArrowForwardIos, Add } from '@mui/icons-material'

import CalendarTopView from '../components/calendarTopView';


// Import Swiper styles
import 'swiper/css';

// install Virtual module
SwiperCore.use([Virtual])

export default function Calendar() {
  //swiper data
  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(2);
  const prependNumber = useRef(-2);
  const todayNumber = useRef(2);
  const swipeToSpeed = useRef(500);

  //date date
  const [selectedDate, setSelectedDate] = useState(moment().startOf('day'))

  // Create array with 500 slides
  const [slides, setSlides] = useState(
   [-2,-1,0,1,2]
  );

  const prepend = () => {
    setSlides([
      prependNumber.current - 1,
      ...slides,
    ]);
    prependNumber.current = prependNumber.current - 1;
    swiperRef.slideTo(swiperRef.activeIndex + 1, 0);
    setSelectedDate(moment(selectedDate).subtract(1,'week').startOf('day'))
  };



  const append = () => {
    setSlides([...slides, ++appendNumber.current]);
  };

  const onSlideChange = (e) => {
    const {isBeginning, isEnd} = e;
    if(isBeginning)
    {
      todayNumber.current = todayNumber.current + 1;
      prepend();
    }
    else if(isEnd)
    {
      append();
    }
  }

  const onStartSlideChange = (e) => {
    const { swipeDirection, activeIndex, previousIndex } = e;
    console.log(e)
    console.log(swipeDirection, activeIndex, previousIndex)

    if(activeIndex > previousIndex)
    {
      setSelectedDate(moment(selectedDate).add(1,'week').startOf('day'))
    }
    else if(activeIndex < previousIndex)
    {
      setSelectedDate(moment(selectedDate).subtract(1,'week').startOf('day'))
    }


    // if(swipeDirection === "prev") setSelectedDate(selectedDate.subtract(1,'week').startOf('day'))
    // else if(swipeDirection === "next") setSelectedDate(selectedDate.add(1,'week').startOf('day'))

  }

  const slideRight = () => {
    slideTo(swiperRef.activeIndex + 1);
  };
  const slideLeft = () => {
    slideTo(swiperRef.activeIndex - 1);
  };

  const slideTo = (index) => {
    swiperRef.slideTo(index, swipeToSpeed.current);
  };

  const setSlide = (index) => {
    swiperRef.slideTo(index, 0);
  }

  return (
    <>
      <Paper 
          square={true}
          sx={{
            position: "fixed",
            zIndex: "tooltip",
            width: "100%",
            pb:2,
          }}
      >
        
        <Stack sx={{pt: 2, px: 2}} flexDirection='row' justifyContent='space-between'>
          <Button onClick={() => setSlide(todayNumber.current)}>
            {selectedDate.format("MMMM YYYY")}
          </Button>
          <Box>
            <IconButton onClick={slideLeft}>
              <ArrowBackIos fontSize='small'/>
            </IconButton>
            <IconButton onClick={slideRight}>
              <ArrowForwardIos fontSize='small' />
            </IconButton>
          </Box>
        </Stack>

        <Swiper
          onSwiper={setSwiperRef}
          onActiveIndexChange={onStartSlideChange}
          // onReachEnd={() => append()}
          // onReachBeginning={() => prepend()}
          // onSlideChangeTransitionStart={onStartSlideChange}
          onSlideChangeTransitionEnd={onSlideChange}
          initialSlide={2}
          virtual
        >
          {slides.map((slideContent, index) => (
            <SwiperSlide key={slideContent} virtualIndex={index}>
                <CalendarTopView weeksPastToday={slideContent} selectedDate={selectedDate} handleClick={setSelectedDate}/>
            </SwiperSlide>
          ))}
        </Swiper>
        <Button onClick={() => console.log(selectedDate.format())}>
          values
        </Button>
        <CalendarTopView weeksPastToday={1} selectedDate={selectedDate} handleClick={setSelectedDate}/>
      </Paper>
    </>
  );
}



// import React from 'react'
// import SwipeableViews from 'react-swipeable-views';
// import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';
// import { Button, Fab, Box, Stack, IconButton, Typography, 
//     Paper, TextField, List, ListItem, ListItemButton,
//     ListItemText,Divider
// } from '@mui/material'
// import { ArrowBackIos, ArrowForwardIos, Add } from '@mui/icons-material'
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import StaticDatePicker from '@mui/lab/StaticDatePicker';
// import Moment from 'react-moment'
// import moment from 'moment';
// import { useState } from 'react'
// import AdapterMoment from '@mui/lab/AdapterMoment'
// import BottomNavigationBar from '../components/bottomNavigationBar';
// import {
//   LeadingActions,
//   SwipeableList,
//   SwipeableListItem,
//   SwipeAction,
//   TrailingActions,
//   Type
// } from 'react-swipeable-list';
// import 'react-swipeable-list/dist/styles.css';
// import useWindowDimensions from '../components/useWindowDimensions';

// const VirtualizeSwipeableViews = virtualize(SwipeableViews);

// function weekDays(startDate){
//   let days = []
//   for(let i = 0; i<7; i++){
//     days.push(moment(startDate).add(i, 'day'));
//   }
//   return days
// }

// export default function Calend(){
//   const [index, setIndex] = useState(0);
//   const [listIndex, setListIndex] = useState(0);
//   const [selected, setSelected] = useState(moment().startOf('day'))
//   const { height, width } = useWindowDimensions()

//   const handleChangeIndex = newIndex => {
//     setIndex(newIndex)
//     if(newIndex > index){
//       setSelected(selected.add(1,'week').startOf('day'))
//     }
//     else{
//       setSelected(selected.subtract(1,'week').startOf('day'))
//     }
//   }

//   const handleListChangeIndex = newIndex => {
//     setListIndex(newIndex)
//     if(newIndex > listIndex){
//       if(selected.day() == 6){
//         setIndex(index + 1)
//       }
//       setSelected(selected.add(1,'day').startOf('day'))
//     }
//     else{
//       if(selected.day() == 0){
//         setIndex(index - 1)
//       }
//       setSelected(selected.subtract(1,'day').startOf('day'))
//     }
//   }

//   const changeIndex = dir => {
//     if(dir > 0){
//       setIndex(index + 1)
//       setSelected(selected.add(1,'week').startOf('day'))
//     }
//     else if(dir < 0){
//       setIndex(index - 1)
//       setSelected(selected.subtract(1,'week').startOf('day'))
//     }
//   }

//   const handleClick = date => {
//     setSelected(date);
//     console.log(date.startOf('day'))
//     console.log(selected)
//   }

//   const backGroundColor = date => {
//     if(date.dayOfYear() === moment().dayOfYear()){
//       return 'primary.dark'
//     }
//     else if(date.dayOfYear() === selected.dayOfYear()){
//       return '#f0f0f0'
//     }
//     else{
//       return ''
//     }
//   }
//   const homeIndex = () => {
//     setIndex(0)
//     setSelected(moment().startOf('day'))
//   }

//   const leadingActions = () => (
//     <LeadingActions>
//       <SwipeAction onClick={() => console.info('swipe action triggered')}>
//         <Box
//           sx={{
//             height: '100%',
//             backgroundColor: 'success.dark',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             px: 2,
//           }}
//         >
//           <Typography
//             color={'common.white'}
//           >
//             Accept
//           </Typography>
//         </Box>
//       </SwipeAction>
//     </LeadingActions>
//   );
  
//   const trailingActions = () => (
//     <TrailingActions>
//       <SwipeAction
//         destructive={true}
//         onClick={() => console.info('swipe action triggered')}
//       >
//         <Box
//           sx={{
//             height: '100%',
//             backgroundColor: 'error.dark',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             px: 2,
//           }}
//         >
//           <Typography
//             color={'common.white'}
//           >
//             Delete
//           </Typography>
//         </Box>
//       </SwipeAction>
//     </TrailingActions>
//   );

//   const slideRender = (params) => {
//     const {index, key} = params;
//     const weekList = weekDays(moment().add(index, 'weeks').startOf('week'));
//     const days = moment.weekdaysShort()
//     return(
//       <Stack key={key} flexDirection='row' justifyContent='space-around' alignItems='baseline'>
//         {weekList.map((date, index) => (
//         <Stack key={date} direction='column' alignItems='center'>
//           <Typography
//             sx={{
//               fontFamily: "Proxima Nova Alt",
//               fontWeight: "fontWeightLight",
//               fontSize: 13,
//             }}
//           >
//             {days[index]}
//           </Typography>
//           <IconButton sx={{
//               backgroundColor:(backGroundColor(date))
//               }} 
//               key={date} onClick={() => handleClick(date.startOf('day'))}>
//             <Typography color={date.dayOfYear() === moment().dayOfYear() ? 'common.white' : ''} >{date.date()}</Typography>
//           </IconButton>
//         </Stack>
//         ))}
//       </Stack>
//     )
//   }

//   const listSlideRenderer = (params) => {
//     const {index, key} = params;
//     return(
//       <Box key={key} sx={{ minHeight: height - 184 }}>
//         <List>
//           {dates.map(({date, time, description, first, last, address}, index2) => (
              
//                   <ListItem key={index2} sx={{ p: 0 }}>
//                     <ListItemButton
//                       onClick={()=>console.log(`Going to customer page ${index2}`)}
//                     >
//                       <ListItemText
//                         primary={
//                           <div>
//                             <Typography
//                               sx={{
//                                 fontFamily: "Proxima Nova Alt",
//                                 fontWeight: "fontWeightThin",
//                                 fontSize: 13,
//                               }}
//                             >
//                               {`${address} ${selected.format('MMMM Do, YYYY [at] h:mm a')}`}
//                             </Typography>
//                             <Typography
//                               sx={{
//                                 fontFamily: "Proxima Nova Alt",
//                                 fontWeight: "fontWeightBold",
//                                 fontSize: 18,
//                               }}
//                             >
//                               {first} {last}
//                             </Typography>
//                           </div>
//                         }
//                         secondary={
//                           <Typography
//                             sx={{
//                               fontFamily: "Proxima Nova Alt",
//                               fontWeight: "fontWeightLight",
//                               fontSize: 13,
//                             }}
//                           >
//                             {date.format('MMMM Do, YYYY [at] h:mm a')}
//                           </Typography>
//                         }
//                       />
//                       <ArrowForwardIos />
//                     </ListItemButton>
//                   </ListItem>
//             ))}
//         </List>
//       </Box>
//     )
//   }

//   return(
//     <div>
//         <Paper 
//           square={true}
//           sx={{
//             position: "fixed",
//             zIndex: "tooltip",
//             width: "100%",
//             pb:2
//           }}
//         >
//           <Stack sx={{pt: 2, px: 2}} flexDirection='row' justifyContent='space-between'>
//             <Button onClick={() => homeIndex()}>{selected.format("MMMM YYYY")}</Button>
//             <Box>
//               <IconButton onClick={() => changeIndex(-1)}>
//                 <ArrowBackIos fontSize='small'/>
//               </IconButton>
//               <IconButton onClick={() => changeIndex(1)}>
//                 <ArrowForwardIos fontSize='small' />
//               </IconButton>
//             </Box>
//           </Stack>
//           <VirtualizeSwipeableViews
//             enableMouseEvents
//             index={index}
//             onChangeIndex={handleChangeIndex}
//             slideRenderer={slideRender}
//           />
//         </Paper>
//         <Box sx={{ pt: 15, pb: 8 }}>
//           <VirtualizeSwipeableViews 
//             enableMouseEvents
//             index={listIndex}
//             onChangeIndex={handleListChangeIndex}
//             slideRenderer={listSlideRenderer}
//           />
//           {/* <SwipeableList
//             fullSwipe={false}
//             type={Type.IOS}
//           >
//               {dates.map(({date, time, description, first, last, address}, index) => (
//                 <SwipeableListItem
//                   key={index}
//                   leadingActions={leadingActions()}
//                   trailingActions={trailingActions()}
//                 > 
//                     <ListItem sx={{ p: 0 }}>
//                       <ListItemButton
//                         onClick={()=>console.log('clicked')}
//                       >
//                         <ListItemText
//                           primary={
//                             <div>
//                               <Typography
//                                 sx={{
//                                   fontFamily: "Proxima Nova Alt",
//                                   fontWeight: "fontWeightThin",
//                                   fontSize: 13,
//                                 }}
//                               >
//                                 {address}
//                               </Typography>
//                               <Typography
//                                 sx={{
//                                   fontFamily: "Proxima Nova Alt",
//                                   fontWeight: "fontWeightBold",
//                                   fontSize: 18,
//                                 }}
//                               >
//                                 {first} {last}
//                               </Typography>
//                             </div>
//                           }
//                           secondary={
//                             <Typography
//                               sx={{
//                                 fontFamily: "Proxima Nova Alt",
//                                 fontWeight: "fontWeightLight",
//                                 fontSize: 13,
//                               }}
//                             >
//                               {date.format('MMMM Do, YYYY [at] h:mm a')}
//                             </Typography>
//                           }
//                         />
//                         <ArrowForwardIos key={index + "arrowButton"} />
//                       </ListItemButton>
//                     </ListItem>
//                 </SwipeableListItem>
//               ))}
//           </SwipeableList> */}
//         </Box>
//         <Fab
//           onClick={() => console.log('clicked')}
//           color="primary"
//           sx={{
//             position: "fixed",
//             bottom: 86,
//             right: 16,
//           }}
//         >
//           <Add />
//         </Fab>
//         <BottomNavigationBar />
//       </div>
//   )
// }


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