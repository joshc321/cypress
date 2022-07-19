import Cookies from 'js-cookie'

async function SearchCustomers(search='') {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 
            'Authorization': 'Bearer ' + Cookies.get('access_token')
         },
    };
    const response = await fetch(`/api/customers/search?q=${search}`, requestOptions)
    return response.json()
}

export default SearchCustomers