async function PostResetPassword(data={}) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api/auth/reset', requestOptions)
    return response.json()
}

export default PostResetPassword