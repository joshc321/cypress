import { useEffect } from "react";
import useGet from "./useGet";
import { useNavigate } from "react-router-dom";

export default function useAuth()
{
    const [data, loading] = useGet('/api/auth');
    const navigate = useNavigate();

    useEffect(() => {
        if(!loading && data?.authed === true) return
        else if (!loading) navigate('/logout')
    }, [loading, data])
}