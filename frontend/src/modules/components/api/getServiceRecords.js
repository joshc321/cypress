import Cookies from 'js-cookie'

async function GetServiceRecords(records=''){
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 
            'Authorization': 'Bearer ' + Cookies.get('access_token'),
         },
    };
    const response = await fetch(`/api/services/s?${records}`, requestOptions)
    return response.json()
}

export default GetServiceRecords