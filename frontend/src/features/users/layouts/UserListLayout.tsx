'use client';

import { TopBar, DisplayButtonLink, Divider } from "@/components/Elements"
import { useUsers } from "../api/getUsers"


export const UserListLayout = () => {
    const users = useUsers({});
    return (
        <div>
            <TopBar primaryText='Users' />

            <div className='pt-40'>
                <ul>
                    {users.data?.map((user) => (
                        <li  key={user.id} >
                            <DisplayButtonLink 
                               
                                primary={user.first + ' ' + user.last} 
                                to={`/user?id=${user.id}`} 
                                secondary={user.email}
                                info={user.role}
                            />
                            <Divider size='sm' variant="middle" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}