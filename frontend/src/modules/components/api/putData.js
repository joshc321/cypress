import Cookies from 'js-cookie'

async function putData(url, data) {
    const requestOptions = {
        method: 'PUT',
        mode: 'cors',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('access_token')
         },
        body: JSON.stringify(data)
    };

    const response = await fetch(url, requestOptions);
    return [await response.json(), response.status]
}

export default putData;