import moment from "moment";

export default function getMonth(selectedDate){
    const daysInMonth = selectedDate.daysInMonth();
    const todayDate = moment();

    const formatted = [];
    let dayOffset = 0 - selectedDate.day();
    while(dayOffset < daysInMonth)
    {
        let rowVals = []
        for(let i = 0; i < 7; i++)
        {
            const v = moment(selectedDate).add(dayOffset, 'days');
            if(v.date() === 1)
                rowVals.push([v.format('MMM D'), v.format("D M YYYY") == todayDate.format("D M YYYY"), v.format('ddd')]);
            else
                rowVals.push([v.format('D'), v.format("D M YYYY") == todayDate.format("D M YYYY"), v.format('ddd')]);
            dayOffset++;
        }
        formatted.push(rowVals);
    }
    return formatted;
}