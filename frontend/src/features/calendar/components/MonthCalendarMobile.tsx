import clsx from "clsx";
import { generateCalendarArray, dateEqualsWithoutTime } from "../utils/dates";
import React from "react";
import { ScheduledService } from "@/features/scheduledService";

export type MonthCalendarMobileProps = {
    className?: string;
    todaysDate: Date;
    activeDate: Date;
    baseDate: Date;
    monthOffset: number;
    onDateClick: (date: Date) => void;
    onFillerDateClick?: () => void;
    calendarEvents: ScheduledService[];
}

export const MonthCalendarMobile = (
    {
        className,
        todaysDate,
        activeDate,
        baseDate,
        monthOffset,
        onDateClick,
        calendarEvents,
        onFillerDateClick,
    }: MonthCalendarMobileProps
) => {


    const [calendarArray, setCalendarArray] = React.useState<Date[][]>([]);
    React.useEffect(() => {
        setCalendarArray(generateCalendarArray(baseDate.getFullYear(), baseDate.getMonth() + monthOffset));
    }, [baseDate, monthOffset]);
      

    return (
        <div className={clsx("flex flex-col bg-primary-dark", className)}>
            <div className="flex flex-col flex-auto text-center h-60 pb-4">
                <CalendarDayNames />
                {calendarArray.map((week, index) => (
                    <CalendarWeek 
                        key={index} 
                        weekArray={week} 
                        todaysDate={todaysDate}
                        activeDate={activeDate}
                        onDateClick={onDateClick}
                        calendarEvents={calendarEvents}
                        onFillerDateClick={onFillerDateClick}
                    />
                ))}
            </div>
            
        </div>
    )
}

type CalendarWeekProps = {
    weekArray: Date[];
    todaysDate: Date;
    activeDate: Date;
    onDateClick: (date: Date) => void;
    onFillerDateClick?: () => void;
    calendarEvents: ScheduledService[];
}

const CalendarWeek = ({
    weekArray,
    todaysDate,
    activeDate,
    onDateClick,
    onFillerDateClick,
    calendarEvents,
    }: CalendarWeekProps
    ) => {

    const filterCalendarEvents = React.useCallback(
        (date: Date) =>
          calendarEvents.filter((event) =>
            dateEqualsWithoutTime(new Date(event.date), date)
          ).length,
        [calendarEvents]
      );
      
    
    return (
        <div className="flex pt-2">
            {weekArray.map((dateObj, index) => (
                <div key={index} className="flex-1 text-center">
                    <div className="box-border border-solid border border-transparent relative">
                        <button 
                            onClick={() => {
                                if (dateObj.getMonth() === activeDate.getMonth()) {
                                    onDateClick(dateObj);
                                } else {
                                    onFillerDateClick && onFillerDateClick();
                                }
                            }}
                            className={
                                clsx("text-md rounded-full h-6 w-6 inline-flex justify-center items-center hover:opacity-80 active:opacity-70",
                                    dateEqualsWithoutTime(dateObj, todaysDate) ? "bg-white text-primary-dark " :
                                    dateEqualsWithoutTime(dateObj, activeDate) ? "border border-white text-white" : "hover:bg-white hover:text-black text-white"
                                )}
                        >
                            {dateObj.getDate()}
                        </button>
                        <CalendarDotsGroup numDots={
                            filterCalendarEvents(dateObj)
                        } />
                    </div>
                </div>
            ))}
        </div>
    
    )
}

const CalendarDotsGroup = ({numDots}: {numDots: number}) => {
    // only allow at most 3 dots
    if (numDots > 3) {
        numDots = 3;
    }
    return (
        <div className="absolute left-0 right-0 block h-1 mt-0.5">
            {Array.from({ length: numDots }).map((_, index) => (
                <CalendarDot key={index} />
            ))}
        </div>
    
    )
}

const CalendarDot = () => {
    return (
        <div className="bg-error h-1 w-1 rounded-full my-0 mx-0.5 inline-block align-top">
        </div>
    )
}

const CalendarDayNames = () => {
    const weekNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="flex">
            {weekNamesShort.map((week, index) => (
                <span key={index} className="text-xs flex-1 text-white">{week}</span>
            ))}
        </div>
    )
}


export const MonthCalendarMobileSpacer = () => {
    return (
        <div className="block h-60">
        </div>
    )
}