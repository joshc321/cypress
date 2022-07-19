async function PostForgot(data={}) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api/auth/forgot', requestOptions)
    return response.json()
}

export default PostForgot