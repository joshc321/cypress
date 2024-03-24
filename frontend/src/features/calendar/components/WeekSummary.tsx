import clsx from 'clsx';
import React from 'react';
import { ScheduledService } from '@/features/scheduledService';
import { generateWeekArray, dateEqualsWithoutTime, getWeekDayNameShort, getTimeString } from '../utils/dates';

export type WeekSummaryProps = {
    className?: string;
    activeDate: Date;
    baseDate: Date;
    weekOffset: number;
    calendarEvents: ScheduledService[];
}

export const WeekSummary = (
    {
        className,
        activeDate,
        baseDate,
        weekOffset,
        calendarEvents,
    }: WeekSummaryProps
    ) => {

    const [calendarArray, setCalendarArray] = React.useState<Date[]>([]);

    React.useEffect(() => {
        setCalendarArray(generateWeekArray(new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + weekOffset * 7)));
    }, [baseDate, weekOffset]);


    return (
        <div className={clsx("flex bg-primary-dark flex-col", className)}>
            <div className="grid grid-cols-7 w-full h-40 divide-x divide-primary-light pb-2">
                {calendarArray.map((date, index) => (
                <div 
                    key={index} 
                    className={
                        clsx(
                            "flex flex-col px-1 items-center h-full pt-2", 
                            dateEqualsWithoutTime(date, activeDate) && 'bg-gradient-to-b from-primary-dark to-primary'
                        )}
                >
                    
                    <div className="flex flex-col justify-center h-full w-full">
                    {calendarEvents.filter(event => dateEqualsWithoutTime(new Date(event.date), date)).map((event, eventIndex) => {
                        const eventDate = new Date(event.date);
                        if( eventIndex < 3) 
                            return(
                                <div
                                    key={eventIndex}
                                    className={`px-2 py-1 rounded-md text-xs mb-1 w-full bg-gray-light`}
                                >
                                    {getTimeString(eventDate)}
                                </div>
                            )
                        else if(eventIndex === 3)
                            return(
                                <div
                                    key={eventIndex}
                                    className={`text-center text-gray text-xs w-full `}
                                >
                                    ...
                                </div>
                            )
                    })}
                    </div>
                    <span className={clsx("py-2 text-xs", dateEqualsWithoutTime(date, activeDate) ? 'text-white' : 'text-gray')}>{getWeekDayNameShort(date)}</span>
                </div>
                ))}
            </div>
        </div>
    )
}


export const WeekSummarySpacer = () => {
    return (
        <div className="h-40"></div>
    )
}