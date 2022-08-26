import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

function SearchCustomers(search='') {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    const [error, setError] = useState(false)

    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 
            'Authorization': 'Bearer ' + Cookies.get('access_token')
         },
    };

    useEffect(() => {
        setLoading(true)
        setHasMore(true)
        fetch(`/api/search?q=${search}&page=${page}`, requestOptions)
            .then(response => {
                if(response.status != 200)
                {
                    setLoading(false)
                    setError(true)
                    console.log(response.status)
                    throw('server errror')
                }
                return response.json()
            })
            .then((rsp) => {
                setLoading(false)
                setCustomers(rsp)
                if(rsp)
                {
                    setError(false)
                    setPage(page + 1)
                }
                else setHasMore(false)
            })
            .catch(e => console.error('server error'))
    }, [search])

    const getMore = () => {
        console.log('gettingm more')
        setLoading(true)
        setHasMore(true)
        fetch(`/api/search?q=${search}&page=${page}`, requestOptions)
            .then(response => {
                if(response.status != 200)
                {
                    setLoading(false)
                    setError(true)
                    console.error(response.status)
                    throw('server errror')
                }
                return response.json()
            })
            .then((rsp) => {
                setLoading(false)
                setCustomers([...customers, ...rsp])
                if(rsp)
                {
                    setError(false)
                    setPage(page + 1)
                }
                else setHasMore(false)
            })
            .catch(e => console.error('server error'))
    }

    return [customers, loading, hasMore, getMore];
}
 
export default SearchCustomers;