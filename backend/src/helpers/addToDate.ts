/**
 @module AddToDate
*/

import moment from "moment"

function addToDate(datetime, duration, unit){
    const nextDate = moment(datetime).add(duration, unit)
    return nextDate.valueOf()
}

export default addToDate