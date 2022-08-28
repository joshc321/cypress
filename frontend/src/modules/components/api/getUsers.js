import useGet from './useGet'

function GetUsers() {
    return useGet('/api/users')
}

export default GetUsers;