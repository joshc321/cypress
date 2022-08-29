import useGet from './useGet'
import moment from 'moment';

function GetUpcoming(date = moment()) {
    return useGet(`/api/scheduleplanner?month=${date.month()+1}&year=${date.year()}`)
}

export default GetUpcoming;