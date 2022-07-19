import Cookies from 'js-cookie'

async function Authoirzed() {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 
            'Authorization': 'Bearer ' + Cookies.get('access_token')
         },
    };
    const response = await fetch(`/api/auth/authorized`, requestOptions)
    return response.json()
}

async function CheckAuth() {
    if(Cookies.get('access_token')){
        const result = await Authoirzed()
        //console.log(result)
        if(result.status === 'authorized'){
            return true
        }
        
        return false
    }
    return false
}

export default CheckAuth