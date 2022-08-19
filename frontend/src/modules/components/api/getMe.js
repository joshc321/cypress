import useGet from "./useGet";

export default function GetMe()
{
    return useGet('/api/users/me');
}