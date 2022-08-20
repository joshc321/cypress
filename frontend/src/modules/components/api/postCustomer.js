import postData from './postData'

function postCustomer(data={}) {
    return postData('/api/customer', data)
}

export default postCustomer