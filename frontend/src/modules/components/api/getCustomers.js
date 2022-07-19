import Cookies from 'js-cookie'

async function GetCustomers(start='', end='') {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 
            'Authorization': 'Bearer ' + Cookies.get('access_token')
         },
    };
    const response = await fetch(`/api/customers?s=${start}&e=${end}`, requestOptions)
    return response.json()
}

export default GetCustomers