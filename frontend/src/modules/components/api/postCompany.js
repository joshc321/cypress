import postData from './postData'

function PostCompany(data={}) {
    return postData('/api/company', data)
}

export default PostCompany