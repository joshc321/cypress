import React, { useRef, useState, useEffect } from 'react';
import SwiperCore, { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import moment from 'moment';

import { Button, Stack,
  Paper,
} from '@mui/material'

import CalendarTopView from '../components/calendarTopView';
import ScrollArrows from '../components/scrollArrows';

// Import Swiper styles
import 'swiper/css';

// install Virtual module
SwiperCore.use([Virtual])

function CalendarTopBar({selectedDate, setSelectedDate})
{
    //swiper data
  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(4);
  const prependNumber = useRef(-30);
  const todayNumber = useRef(30);
  const swipeToSpeed = useRef(500);
  const initialSlide = useRef(30);

  // Create array with 500 slides
  const [slides, setSlides] = useState(
    Array.from({length: 35}, (_, i) => i - 30)
  );

  const prepend = () => {
    setSlides([
      prependNumber.current - 1,
      ...slides,
    ]);
    prependNumber.current = prependNumber.current - 1;
    swiperRef.slideTo(swiperRef.activeIndex + 1, 0); //can't set effect time to 0 until infinte scroll on single date move back is fixed
    setSelectedDate(moment(selectedDate).subtract(1,'week').startOf('day'))
  };

  //top bar data
  const append = () => {
    setSlides([...slides, ++appendNumber.current]);
  };

  const moveAmount = () => {
    if(swiperRef === null)
    {
        return 0
    }
    const currentS = moment().add(slides[swiperRef.activeIndex], 'weeks').startOf('week');
    const currentE = moment().add(slides[swiperRef.activeIndex], 'weeks').endOf('week');
    const diffS = selectedDate.diff(currentS, 'weeks')
    const diffE = selectedDate.diff(currentE, 'weeks')

    let moveA = Math.max(Math.abs(diffS), Math.abs(diffE));
    if(diffS < 0 || diffE < 0)
    {
        moveA *= -1;
    }
    return moveA
  }

  useEffect(() => {
    const moveA = moveAmount()
    if(moveA !== 0)
    {
        slideTo(swiperRef.activeIndex + moveA);
    }

  }, [selectedDate])

  const onEndSlideChange = (e) => {
    const {isBeginning, isEnd, activeIndex, previousIndex } = e;
    if(isBeginning)
    {
      todayNumber.current = todayNumber.current + 1;
      prepend();
    }
    else if(isEnd)
    {
      append();
    }
    const moveA = moveAmount()
    if(activeIndex > previousIndex && moveA !== 0)
    {
      setSelectedDate(moment(selectedDate).add(1,'week').startOf('day'))
    }
    else if(activeIndex < previousIndex  && moveA !== 0)
    {
      setSelectedDate(moment(selectedDate).subtract(1,'week').startOf('day'))
    }
  }

  const onStartSlideChange = ({ activeIndex, previousIndex }) => {
    // if(activeIndex > previousIndex)
    // {
    //   setSelectedDate(moment(selectedDate).add(1,'week').startOf('day'))
    // }
    // else if(activeIndex < previousIndex)
    // {
    //   setSelectedDate(moment(selectedDate).subtract(1,'week').startOf('day'))
    // }
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

  const homeSlide = () => {
    setSlide(todayNumber.current);
    setSelectedDate(moment().startOf('day'))
  }
    return(
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
          <Button onClick={homeSlide}>
            {selectedDate.format("MMMM YYYY")}
          </Button>
          <ScrollArrows onBackArrow={slideLeft} onForwardArrow={slideRight} />
        </Stack>

        <Swiper
          onSwiper={setSwiperRef}
          onActiveIndexChange={onStartSlideChange}
          onSlideChangeTransitionEnd={onEndSlideChange}
          initialSlide={initialSlide.current}
          onAfterInit={() => setSelectedDate(moment().startOf('day'))}
          virtual
        >
          {slides.map((slideContent, index) => (
            <SwiperSlide key={slideContent} virtualIndex={index}>
                <CalendarTopView weeksPastToday={slideContent} selectedDate={selectedDate} handleClick={setSelectedDate}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </Paper>
    )
}

export default CalendarTopBar;