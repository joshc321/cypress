import Cookies from 'js-cookie'

async function postData(url, data) {
    const requestOptions = {
        method: 'POST',
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

export default postData;