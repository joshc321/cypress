import postData from "./postData";

export default function PostForgot(data={})
{
    return postData('/api/forgot', data)
}