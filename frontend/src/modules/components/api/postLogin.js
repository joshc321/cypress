async function PostLogin(data={}) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api/auth/login', requestOptions)
    return response.json()
}

export default PostLogin