import Cookies from 'js-cookie'

async function getData(url) {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('access_token')
         }
    };

    const response = await fetch(url, requestOptions);
    return [await response.json(), response.status]
}

export default getData;