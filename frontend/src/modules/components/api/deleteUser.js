import deleteItem from "./deleteItem";

export default function  deleteUser(id='')
{
    return deleteItem(`/api/users/${id}`);
}