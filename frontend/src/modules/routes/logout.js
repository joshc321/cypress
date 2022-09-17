import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

export default function Logout()
{
    useEffect(() => {
        Cookies.remove('access_token')
    })

    return(
        <Navigate replace to='/login?redirect=true'/>
    )
}