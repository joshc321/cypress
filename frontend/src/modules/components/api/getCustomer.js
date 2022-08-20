import useGet from './useGet'

function GetCustomer(id='') {
    return useGet(`/api/customer/${id}`)
}

export default GetCustomer;