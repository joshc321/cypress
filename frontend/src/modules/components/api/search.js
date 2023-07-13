import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function SearchCustomers(search='', filter='') {

    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);


    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 
            'Authorization': 'Bearer ' + Cookies.get('access_token')
         },
    };

    useEffect(() => {
        setCustomers([]);
        setLoading(true)
        setHasMore(true)
        setPage(0);

        fetch(`/api/search?q=${search}&f=${filter}`, requestOptions)
            .then(response => {
                switch(response.status)
                {
                    case 200:
                        return response.json()
                    case 401:
                        navigate('/logout');
                        break;
                    default:
                        setLoading(false)
                        console.error(response.status)
                        throw('server errror')
                }
            })
            .then((rsp) => {
                setLoading(false);
                setCustomers(rsp);
                if(rsp && Array.isArray(rsp) && rsp.length >= 10)
                {
                    setPage(1)
                }
                else setHasMore(false)
            })
            .catch(e => console.error('server error'))
    }, [search, filter])

    const getMore = () => {
        setLoading(true)
        setHasMore(true)
        fetch(`/api/search?q=${search}&page=${page}&f=${filter}`, requestOptions)
            .then(response => {
                switch(response.status)
                {
                    case 200:
                        return response.json()
                    case 401:
                        navigate('/logout');
                        break;
                    default:
                        setLoading(false)
                        console.error(response.status)
                        throw('server errror')
                }
            })
            .then((rsp) => {
                setLoading(false)
                setCustomers([...customers, ...rsp])
                if(rsp && Array.isArray(rsp) && rsp.length >= 10)
                {
                    setPage(page + 1);
                }
                else setHasMore(false)
            })
            .catch(e => console.error('server error'))
    }

    return [customers, loading, hasMore, getMore];
}
 
export default SearchCustomers;