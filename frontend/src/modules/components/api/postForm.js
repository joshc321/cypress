import Cookies from 'js-cookie'

async function postForm(url, data) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 
            'Authorization': 'Bearer ' + Cookies.get('access_token')
         },
        body: data
    };

    const response = await fetch(url, requestOptions);
    return [await response.json(), response.status]
}

export default postForm;