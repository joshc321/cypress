import postData from "./postData";

export default function postScheduledService(data={})
{
    return postData('/api/serviceschedule', data)
}