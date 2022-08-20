import postData from './postData'

function PostUser(data={}) {
    return postData('/api/newuser', data)
}

export default PostUser