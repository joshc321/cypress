function CreateFullAddress(data){
    let fullAddress = '';
    if(data.address){
        fullAddress += data.address + ' ';
    }
    if(data.city){
        fullAddress += data.city + ', ';
    }
    if(data.state){
        fullAddress += data.state + ' ';
    }
    if(data.zip){
        fullAddress += data.zip;
    }
    return fullAddress
}

export default CreateFullAddress