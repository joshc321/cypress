import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'

function useGet(url) {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 
            'Authorization': 'Bearer ' + Cookies.get('access_token')
         },
    };
    useEffect(() => {
        if(!url) return;
        fetch(url, requestOptions)
        .then(response => response.json())
        .then((rsp) => {
            setData(rsp)
            setLoading(false)
        })
        .catch((e) => console.error('Server Connection Error'))
    }, [url])
    
    return [data, loading]
}

export default useGet;