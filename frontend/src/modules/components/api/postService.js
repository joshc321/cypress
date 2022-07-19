import Cookies from 'js-cookie'

async function NewService(data={}, id='') {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 
            'Authorization': 'Bearer ' + Cookies.get('access_token'),
            'Content-Type': 'application/json'
         },
        body: JSON.stringify(data)
    };
    const response = await fetch(`/api/services/${id}`, requestOptions)
    return response.json()
}

export default NewService