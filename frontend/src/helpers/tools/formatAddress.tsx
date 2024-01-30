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
function formatAddress(address: AddressSpec | undefined): string {

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


export default formatAddress;