interface AddressSpec {
    street?: string,
    city?: string,
    state?: string,
    zip?: string
}

/**
 * @param address - an object containing the keys street, city, state, and zip
 * @returns a string containing the address in the format of street, city, state zip
 */
export const formatAddress = (address: AddressSpec | undefined): string => {

    if (!address) return ('');

    let fullAddress = '';
    if(address?.street){
        fullAddress += address?.street + ' ';
    }
    if(address?.city){
        fullAddress += address?.city + ', ';
    }
    if(address?.state){
        fullAddress += address?.state + ' ';
    }
    if(address?.zip){
        fullAddress += address?.zip;
    }
    return fullAddress
}


/**
 * @param date - a string containing the date to be formatted in ISO format
 * @returns a string containing the formatted date in the format: "month day, year"
 */
export const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })
}



interface IntervalSpec {
    duration: number,
    unit: string
}

/**
 * @param interval - an object containing the duration and unit of the interval
 * @returns a string containing the formatted interval in the format: "duration unit"
 * 
 * Supported values for interval
 * 
 * Supported values for duration
 *  - any positive integer
 * 
 * Supported values for unit
 *  - 'seconds', 'second', 'secs', 'sec', 's' (all equivalent)
 *  - 'minutes', 'minute', 'mins', 'min', 'm' (all equivalent)
 *  - 'hours', 'hour', 'hrs', 'hr', 'h' (all equivalent)
 *  - 'days', 'day', 'd' (all equivalent)
 *  - 'weeks', 'week', 'wks', 'wk', 'w' (all equivalent)
 *  - 'months', 'month', 'mos', 'mo' (all equivalent)
 *  - 'years', 'year', 'yrs', 'yr', 'y' (all equivalent)
 * 
 */

export const formatInterval = (interval: IntervalSpec | undefined) => {
    if (!interval) return 'N/A' // if interval is undefined, return 'N/A'

    // destructure the interval object
    const { duration, unit } = interval

    // define the formatted interval
    let formattedInterval = '';

    // if the duration is 1, use the singular form of the unit

    if (duration === 1) {
        switch (unit) {
            case 'seconds':
            case 'second':
            case 'secs':
            case 'sec':
            case 's':
                formattedInterval = `${duration} second`;
                break;
            case 'minutes':
            case 'minute':
            case 'mins':
            case 'min':
            case 'm':
                formattedInterval = `${duration} minute`;
                break;
            case 'hours':
            case 'hour':
            case 'hrs':
            case 'hr':
            case 'h':
                formattedInterval = `hourly`;
                break;
            case 'days':
            case 'day':
            case 'd':
                formattedInterval = `daily`;
                break;
            case 'weeks':
            case 'week':
            case 'wks':
            case 'wk':
            case 'w':
                formattedInterval = `weekly`;
                break;
            case 'months':
            case 'month':
            case 'mos':
            case 'mo':
                formattedInterval = `monthly`;
                break;
            case 'years':
            case 'year':
            case 'yrs':
            case 'yr':
            case 'y':
                formattedInterval = `yearly`;
                break;
            default:
                formattedInterval = 'N/A';
        }
    }

    // if the duration is not 1, use the plural form of the unit

    else {
        switch (unit) {
            case 'seconds':
            case 'second':
            case 'secs':
            case 'sec':
            case 's':
                formattedInterval = `${duration} seconds`;
                break;
            case 'minutes':
            case 'minute':
            case 'mins':
            case 'min':
            case 'm':
                formattedInterval = `${duration} minutes`;
                break;
            case 'hours':
            case 'hour':
            case 'hrs':
            case 'hr':
            case 'h':
                formattedInterval = `every ${duration} hours`;
                break;
            case 'days':
            case 'day':
            case 'd':
                formattedInterval = `every ${duration} days`;
                break;
            case 'weeks':
            case 'week':
            case 'wks':
            case 'wk':
            case 'w':
                formattedInterval = `every ${duration} weeks`;
                break;
            case 'months':
            case 'month':
            case 'mos':
            case 'mo':
                formattedInterval = `every ${duration} months`;
                break;
            case 'years':
            case 'year':
            case 'yrs':
            case 'yr':
            case 'y':
                formattedInterval = `every ${duration} years`;
                break;
            default:
                formattedInterval = 'N/A';
        }
    }

    // return the formatted interval
    return formattedInterval;
}



// TODO rewrite regex to match all phone number formats

/**
 * @param phone - a string containing a phone number
 * @returns a string containing the phone number in the format of xxx-xxx-xxxx
 */
export const formatPhone = (phone: string | undefined) => {
    if (!phone) return '';
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
}

