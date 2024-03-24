'use client';

import React, { useRef, useState } from 'react';
import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { WeekSummary, WeekSummarySpacer } from '../components/WeekSummary';
import { CalendarHeader, CalendarHeaderSpacer } from '../components/CalendarHeader';
import { MonthCalendarMobile, MonthCalendarMobileSpacer } from '../components/MonthCalendarMobile';
import { useTodayDate } from '../hooks';
import { getMonthName, getDateMonthNameShort, getStartOfWeek, dateEqualsWithoutTime } from '../utils/dates';
import { ScheduledServiceList } from '@/features/scheduledService/components/ScheduledServiceList';

// Import Swiper styles
import 'swiper/css';
import { useScheduledServices } from '@/features/scheduledService/api/getScheduledServices';


export const CalendarLayout = () => {

  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [endDate, setEndDate] = useState(new Date().toISOString());
  const calendarEvents = useScheduledServices({startDate, endDate});

  // swiper refs
  const [calendarSwiperRef, setCalendarSwiperRef] = useState<any>(undefined);
  const [daySwiperRef, setDaySwiperRef] = useState<any>(undefined);

  // base dates for the calendar views
  const [baseWeek, setBaseWeek] = useState(new Date());
  const [baseMonth, setBaseMonth] = useState(new Date());
  const [baseDate, setBaseDate] = useState(new Date());

  // toggle between month and week view
  const [monthToggle, setMonthToggle] = useState(true);

  // date state for the calendar views
  const [activeDate, setActiveDate] = useState(new Date());
  const todaysDate = useTodayDate();

  // initial slide index
  const initialSlide = useRef(100);

  // Create array with 5 slides
  const [slides, setSlides] = useState(
    Array.from({ length: 201 }).map((_, index) => index - initialSlide.current)
  );

  React.useEffect(() => {
    let start;
    let end;
    if (monthToggle == true) {
      start = new Date(activeDate.getFullYear(), activeDate.getMonth(), 1);
      end = new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, 0);
    }
    else {
      start = getStartOfWeek(activeDate);
      end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6);
    }
    if (dateEqualsWithoutTime(start, new Date(startDate)) && dateEqualsWithoutTime(end, new Date(endDate))) {
      return;
    }
    setStartDate(start.toISOString());
    setEndDate(end.toISOString());
  
  }, [activeDate]);


  const slideRight = () => {
    calendarSwiperRef?.slideNext();
  }
  const slideLeft = () => {
    calendarSwiperRef?.slidePrev();
  }
  const goToToday = () => {
    if (calendarSwiperRef) {
      calendarSwiperRef?.slideTo(initialSlide.current);
      daySwiperRef?.slideTo(initialSlide.current);

      setBaseWeek(todaysDate);
      setBaseMonth(todaysDate);
      setBaseDate(todaysDate);
      setActiveDate(todaysDate);
    }
    
  }

  const handleSlideChange = (e: any) => {
    const {isBeginning, isEnd, activeIndex, previousIndex } = e;

    if (isBeginning) {
      // 
    }

    if (isEnd) {
      // append 3 slides to the end
      const newSlides = Array.from({ length: 3 }).map((_, index) => slides[slides.length - 1] + index + 1);
      setSlides([...slides, ...newSlides]);


      console.log('added slides to the end')
    }

    
  }

  const onCalendarSlideChange = (e: any) => {
    if (monthToggle == true) {
      onMonthSlideChange(e);
    }
    else {
      onWeekSlideChange(e);
    }
  }

  const onMonthSlideChange = (e: any) => {
    const { activeIndex, previousIndex } = e;

    if (activeIndex > previousIndex) {
      // moved to the next slide
      setActiveCalendarDateControlled(new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, 1));
      // console.log('slide right');
    }
    else if (activeIndex < previousIndex) {
      // moved to the previous slide
      setActiveCalendarDateControlled(new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, 1));
      // console.log('slide left');
    }

    handleSlideChange(e);

  }

  const onWeekSlideChange = (e: any) => {
    const { activeIndex, previousIndex } = e;

    if (activeIndex > previousIndex) {
      // moved to the next slide
      setActiveCalendarDateControlled(new Date(activeDate.getFullYear(), activeDate.getMonth(), activeDate.getDate() + 7));
      // console.log('slide right');
    }
    else if (activeIndex < previousIndex) {
      // moved to the previous slide
      setActiveCalendarDateControlled(new Date(activeDate.getFullYear(), activeDate.getMonth(), activeDate.getDate() - 7));
      // console.log('slide left');
    }

    handleSlideChange(e);

  }

  const onDaySlideChange = (e: any) => {
    const { activeIndex, previousIndex } = e;

    if (activeIndex > previousIndex) {
      // moved to the next slide
      setActiveCalendarDateControlled(new Date(activeDate.getFullYear(), activeDate.getMonth(), activeDate.getDate() + 1));
      // console.log('slide right');
    }
    else if (activeIndex < previousIndex) {
      // moved to the previous slide
      setActiveCalendarDateControlled(new Date(activeDate.getFullYear(), activeDate.getMonth(), activeDate.getDate() - 1));
      // console.log('slide left');
    }

    handleSlideChange(e);
  }

  
  const handleMonthToggle = () => {
    setMonthToggle(!monthToggle);
  }

  const setActiveCalendarDateControlled = (date: Date) => {

    setBaseWeek(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7 * slides[calendarSwiperRef?.activeIndex]));

    setBaseMonth(new Date(date.getFullYear(), date.getMonth() - slides[calendarSwiperRef?.activeIndex], 1));

    setBaseDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - slides[daySwiperRef?.activeIndex]));

    setActiveDate(date);
  }

  const initAfterSwiperInit = () => {
    setActiveDate(new Date());
    setBaseWeek(new Date());
    setBaseMonth(new Date());
    setBaseDate(new Date());
  }



  return (
    <div className='relative overflow-hidden'>
      <div className='bg-primary-dark fixed top-0 left-0 right-0 z-10'>
        <CalendarHeader 
          onDateClick={handleMonthToggle}
          selectedDate={activeDate}
          onLeftArrowClick={slideLeft}
          onRightArrowClick={slideRight}
          onTodayClick={goToToday}
          headerText={ monthToggle ? 
            getMonthName(activeDate) : 
            `${getDateMonthNameShort(getStartOfWeek(activeDate))} - ${getDateMonthNameShort(new Date(getStartOfWeek(activeDate).getFullYear(), getStartOfWeek(activeDate).getMonth(), getStartOfWeek(activeDate).getDate() + 6))}`
          }
        />
        
        <Swiper
          modules={[Virtual]}
          onSwiper={setCalendarSwiperRef}
          slidesPerView={1}
          onSlideChange={onCalendarSlideChange}
          initialSlide={initialSlide.current}
          onAfterInit={initAfterSwiperInit}
          virtual
        >
          {slides.map((slideContent, index) => (
            <SwiperSlide key={slideContent} virtualIndex={index}>
              <div>
                { monthToggle ? 
                  <MonthCalendarMobile 
                    todaysDate={todaysDate}
                    activeDate={activeDate}
                    baseDate={baseMonth}
                    monthOffset={slideContent}
                    onDateClick={setActiveCalendarDateControlled}
                    calendarEvents={calendarEvents.data || []}
                  />
                   : 
                  <WeekSummary 
                        activeDate={activeDate} 
                        baseDate={baseWeek}
                        weekOffset={slideContent}
                        calendarEvents={calendarEvents.data || []}
                  /> 
                 }
                  
                
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <CalendarHeaderSpacer />
      {monthToggle ?
        <MonthCalendarMobileSpacer />
        :
        <WeekSummarySpacer />
      }
      <Swiper
        modules={[Virtual]}
        slidesPerView={1}
        onSwiper={setDaySwiperRef}
        onSlideChange={onDaySlideChange}
        initialSlide={initialSlide.current}
        onAfterInit={initAfterSwiperInit}
        virtual
      >
        {slides.map((slideContent, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <div className='h-96 overflow-scroll'>
                <ScheduledServiceList 
                      data={calendarEvents.data?.filter(event => dateEqualsWithoutTime(new Date(event.date), new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + slideContent))) || []}
                      linkTo="/scheduled-service?id=" 
                    />
                <h1 className='text-center font-semibold'>Slide {slideContent}</h1>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}
