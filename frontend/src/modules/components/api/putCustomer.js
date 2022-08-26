import putData from './putData'

function putCustomer(data={}, id='') {
    return putData(`/api/customer/${id}`, data)
}

export default putCustomer;