import { Box,Typography, List, ListItemText,
        ListItemButton, ListItem, Divider } from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'
import BottomNavigationBar from '../components/bottomNavigationBar'
import TopBarLarge from '../components/topBarLarge'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import CheckAuth from '../components/api/authorized'
import { useState, useEffect, useCallback } from 'react'
import GetUser from '../components/api/getUser'
import SingleListItem from '../components/singleListItem'

function Account(){
    const navigate = useNavigate();
    const [user, setUser] = useState(userDemo)

    

    const logout = () =>{
        Cookies.remove('access_token')
        navigate('/login')
    }

    return(
        <Box sx={{pb: 10}}>
            <TopBarLarge primary={"Cypress"} secondary={user.first + ' ' +user.last}/>
            <Box>
                <nav aria-label="main user actions">
                    <List>
                        <SingleListItem text="Stragglers" to="/stragglers" divider/>
                        <SingleListItem text="New User" to="/adduser" divider/>
                        <SingleListItem text="Users" to="/users"/>

                        <Divider sx={{ borderBottomWidth: 28 }}/>
                        <SingleListItem text="Edit Account" to="/edit-account" divider/>
                        <SingleListItem text="Logout" to="/logout" color="error.dark" divider/>
                    </List>
                </nav>
            </Box>
            <BottomNavigationBar value={4} />
        </Box>

    )
}

export default Account

const userDemo = {
    first: 'Josh',
    last: 'Cordero',
    email: 'Josh@email.com',
    permissionLevel: 2,
    company: '9a8sd7f09a8sd',
    password: 'a-9sd8fyvn-a9w8dufaiousdyf098a7sdf'
}