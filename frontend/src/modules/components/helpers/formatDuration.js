import moment from "moment"

function formatDuration(duration, unit){
    if(duration === 1 && unit in mappingSingle)
    {
        return mappingSingle[unit];
    }
    else if(duration > 1 && unit in mappingMultiple)
    {
        return `Every ${duration} ${mappingMultiple[unit]}`;
    }
    else
    {
        return moment.duration(duration, unit).humanize();
    }
}

export default formatDuration

const mappingSingle = {
    'y': 'Yearly',
    'years': 'Yearly',
    'M': 'Monthly',
    'months': 'Monthly',
    'w': 'Weekly',
    'weeks': 'Weekly',
    'd': 'Daily',
    'days': 'Daily',
    'h': 'Hourly',
    'hours': 'Hourly'
}

const mappingMultiple = {
    'y': 'years',
    'years': 'years',
    'M': 'months',
    'months': 'months',
    'w': 'weeks',
    'weeks': 'weeks',
    'd': 'days',
    'days': 'days',
    'h': 'hours',
    'hours': 'hours'
}