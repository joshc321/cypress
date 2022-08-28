function formatAddress(address){
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

export default formatAddress;