import postData from './postData'

async function postService(data={}, id='') {
    data.customer = id
    return postData('/api/servicerecord', data);
}

export default postService;