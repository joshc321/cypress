import putData from './putData'

function putUser(data={}, id='') {
    return putData(`/api/users/${id}`, data)
}

export default putUser;