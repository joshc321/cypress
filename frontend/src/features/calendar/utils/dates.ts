
/*
    Generate a 2D array representing the days of the month with
    each week as a subarray. The week subarrays start on Sunday
    and end on Saturday. If the month does not start on Sunday,
    the first subarray will contain the remaining days from the
    previous month. If the month does not end on Saturday, the
    last subarray will contain the remaining days from the next
    month.
*/
export const generateCalendarArray = (year: number, month: number): Date[][] => {
    const calendarArray = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let startDay = new Date(year, month, 1).getDay();
    let endDay = new Date(year, month + 1, 0).getDay();
  
    // Handle the days from the previous month
    let prevMonthDays = [];
    if (startDay !== 0) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevMonthYear = month === 0 ? year - 1 : year;
      const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

  
      for (let i = startDay; i > 0; i--) {
        const dateOfPrevMonth = new Date(prevMonthYear, prevMonth, daysInPrevMonth - i + 1);
        prevMonthDays.push(dateOfPrevMonth);
      }
    }
  
    // Generate the current month days
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
        const dateOfCurrentMonth = new Date(year, month, i);
        currentMonthDays.push(dateOfCurrentMonth);
    }
  
    // Handle the days from the next month
    let nextMonthDays = [];
    if (endDay !== 6) {
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextMonthYear = month === 11 ? year + 1 : year;
      for (let i = 1; i <= 6 - endDay; i++) {
        const dateOfNextMonth = new Date(nextMonthYear, nextMonth + 1, i);
        nextMonthDays.push(dateOfNextMonth);
      }
    }
  
    // Combine the days into weeks
    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    for (let i = 0; i < allDays.length; i += 7) {
      calendarArray.push(allDays.slice(i, i + 7));
    }
  
    return calendarArray;
}


/*
    Check if two dates are equal without comparing the time
*/
export const dateEqualsWithoutTime = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

/*
    Check if two dates are is the same week
*/
export const dateEqualsWeek = (date1: Date, date2: Date): boolean => {
    return getStartOfWeek(date1).getTime() === getStartOfWeek(date2).getTime();
}

/*
    Check if two dates are is the same month
*/
export const dateEqualsMonth = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth();
}


/*
    Generate an array of dates representing the week of the target date
    starting on Sunday and ending on Saturday.
*/
export const generateWeekArray = (targetDate: Date): Date[] => {
    const weekArray = [];
    const startOfWeek = getStartOfWeek(targetDate);
    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
        weekArray.push(date);
    }
    return weekArray;
}


/*
    Get the date of the first day of the week for the target date
    starting on Sunday and ending on Saturday.
*/
export const getStartOfWeek = (targetDate: Date): Date => {
    return new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() - targetDate.getDay(), 0, 0, 0, 0);
}


/*
    Get the name of the month for the target month number
    0 = January, 1 = February, ..., 11 = December
*/
export const getMonthName = (date: Date): string => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return monthNames[date.getMonth()];
}

/*
    Get the date and short name of the month for the target date
    0 = Jan, 1 = Feb, ..., 11 = Dec
*/
export const getDateMonthNameShort = (date: Date): string => {
    const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getDate()} ${monthNamesShort[date.getMonth()]}`;
}

/*
    Get the short name of the weekday for the target date
    0 = Sun, 1 = Mon, ..., 6 = Sat
*/
export const getWeekDayNameShort = (date: Date): string => {
    const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayNamesShort[date.getDay()];
}

/*
    Get the time string for the target date
    in the format "HH:MM" 0 filled to 2 digits
*/
export const getTimeString = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}