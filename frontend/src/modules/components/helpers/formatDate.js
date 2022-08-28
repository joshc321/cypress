import moment from "moment"

function formatDate(date, includeTime=false){
    if(date && includeTime)
    {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
    else if(date && !includeTime)
    {
        return moment(date).format('MMMM Do YYYY');
    }
    else
    {
        return 'No Date'
    }
}

export default formatDate