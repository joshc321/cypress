import TopBarBase from "../components/topBarBase";
import { useEffect, useState } from 'react'
import UsersList from "../components/usersList";
import BottomNavigationBar from "../components/bottomNavigationBar";
import useAuth from "../components/api/useAuth";
import GetUsers from "../components/api/getUsers";
import GetMe from "../components/api/getMe"
import getCompany from "../components/api/getCompany";
import { useNavigate } from 'react-router-dom'

function Users()
{
    useAuth();
    const navigate = useNavigate();
    const [me, loadingM] = GetMe();
    const [users, loadingU] = GetUsers();
    const [company, setCompany] = useState({name: 'loading'})
    
    useEffect(() => {
        if(me && me.company)
        {
            getCompany(me.company)
              .then((rsp) => {
                const [data, status] = rsp;
                switch(status)
                {
                    case 200:
                        setCompany(data)
                        break;
                    case 422:
                        console.error(rsp)
                        break;
                    case 401:
                        navigate('/logout');
                        break;
                    default:
                        console.error(rsp)
                }
              }).catch(e => console.log("server error"))
        }
    }, [loadingM])

    return(
        <div>
            <TopBarBase primary={company?.name} secondary={"Users"}/>
            {!loadingU && <UsersList users={users} />}
            <BottomNavigationBar />
        </div>
    )
}

export default Users;