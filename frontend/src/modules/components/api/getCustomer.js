import Cookies from 'js-cookie'

async function GetCustomer(id='') {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 
            'Authorization': 'Bearer ' + Cookies.get('access_token')
         },
    };
    const response = await fetch(`/api/customers/${id}`, requestOptions)
    return response.json()
}

export default GetCustomer