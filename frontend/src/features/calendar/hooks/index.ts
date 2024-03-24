import React from "react";

/*
    Hook to get the current date and time that updates every second
*/
export const useTodayDate = () => {
    const [todaysDate, setTodaysDate] = React.useState<Date>(new Date());

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTodaysDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    });

    return todaysDate;
}