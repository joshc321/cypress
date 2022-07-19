function ToStrDate(date){
    if(date){
        return new Date(date['$date']).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
    }
    else{
        return 'No Date'
    }
}

export default ToStrDate