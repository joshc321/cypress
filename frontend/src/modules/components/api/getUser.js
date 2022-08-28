import useGet from './useGet'

function GetUser(id='') {
    return useGet(`/api/users/${id}`)
}

export default GetUser;