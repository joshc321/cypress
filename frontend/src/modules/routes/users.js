import TopBarBase from "../components/topBarBase";
import { useState } from 'react'
import UsersList from "../components/usersList";
import BottomNavigationBar from "../components/bottomNavigationBar";

function Users()
{

    const [company, setCompany] = useState(companyDemo);
    const [users, setUsers] = useState(usersDemo);

    return(
        <div>
            <TopBarBase primary={company?.name} secondary={"Users"}/>
            <UsersList users={users} />
            <BottomNavigationBar />
        </div>
    )
}

export default Users;

const companyDemo = {
    name: 'Aqua Works',
    active: true,   
}

const usersDemo = [
    {
        _id: '0s98f7dg098sdfg',
        first: 'Josh',
        last: 'Cordero',
        email: 'joshcordero2134@gmail.com',
        permissionLevel: 2,
    },
    {
        _id: '0s98f7dg098sdfg',
        first: 'Josh',
        last: 'Cordero',
        email: 'joshcordero2134@gmail.com',
        permissionLevel: 2,
    },
    {
        _id: '0s98f7dg098sdfg',
        first: 'Josh',
        last: 'Cordero',
        email: 'joshcordero2134@gmail.com',
        permissionLevel: 2,
    },
    {
        _id: '0s98f7dg098sdfg',
        first: 'Josh',
        last: 'Cordero',
        email: 'joshcordero2134@gmail.com',
        permissionLevel: 1,
    },
    {
        _id: '0s98f7dg098sdfg',
        first: 'Josh',
        last: 'Cordero',
        email: 'joshcordero2134@gmail.com',
        permissionLevel: 0,
    },
    {
        _id: '0s98f7dg098sdfg',
        first: 'Josh',
        last: 'Cordero',
        email: 'joshcordero2134@gmail.com',
        permissionLevel: 1,
    },
    {
        _id: '0s98f7dg098sdfg',
        first: 'Josh',
        last: 'Cordero',
        email: 'joshcordero2134@gmail.com',
        permissionLevel: 1,
    },
    {
        _id: '0s98f7dg098sdfg',
        first: 'Josh',
        last: 'Cordero',
        email: 'joshcordero2134@gmail.com',
        permissionLevel: 0,
    }
]