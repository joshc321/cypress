import postForm from "./postForm"

function postCustomers(data={}) {
    return postForm('/api/customer/many', data)
}

export default postCustomers;