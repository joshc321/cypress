import Cookies from 'js-cookie'

async function UpdateCustomer(data={}, id='') {
    const requestOptions = {
        method: 'PUT',
        mode: 'cors',
        headers: { 
            'Authorization': 'Bearer ' + Cookies.get('access_token'),
            'Content-Type': 'application/json'
         },
        body: JSON.stringify(data)
    };
    const response = await fetch(`/api/customers/${id}`, requestOptions)
    return response.json()
}

export default UpdateCustomer