function ConvertDate(raw){
    let date = new Date(raw)
    let parsedYear = date.getFullYear();
    let parsedField = (field) => {
        let fieldS = ''
        if (field < 10){
            fieldS = `0${field}`;
        }
        else{
            fieldS = field;
        }
        return(fieldS);
    }
    let parsedMonth = parsedField(date.getMonth()+1);
    let parseDay = parsedField(date.getDate());
    let parseHour = parsedField(date.getHours());
    let parseMin = parsedField(date.getMinutes());
    let stringDate = `${parsedYear}-${parsedMonth}-${parseDay}T${parseHour}:${parseMin}`
    return stringDate
}

export default ConvertDate