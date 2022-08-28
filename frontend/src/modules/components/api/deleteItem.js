import Cookies from 'js-cookie'

async function deleteItem(url) {
    const requestOptions = {
        method: 'DELETE',
        mode: 'cors',
        headers: { 
            'Authorization': 'Bearer ' + Cookies.get('access_token')
         }
    };

    const response = await fetch(url, requestOptions);
    return [await response.json(), response.status]
}

export default deleteItem;