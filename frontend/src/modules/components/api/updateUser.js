import Cookies from 'js-cookie'

async function UpdateUser(data={}, id='') {
    const requestOptions = {
        method: 'PUT',
        mode: 'cors',
        headers: { 
            'Authorization': 'Bearer ' + Cookies.get('access_token'),
            'Content-Type': 'application/json'
         },
        body: JSON.stringify(data)
    };
    const response = await fetch(`/api/users/${id}`, requestOptions)
    return response.json()
}

export default UpdateUser