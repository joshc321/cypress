import postData from "./postData";

export default function PostResetPassword(data={})
{
    return postData('/api/reset', data)
}