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

function Account(){
    const navigate = useNavigate();
    const [user, setUser] = useState({})

    const authed = useCallback(async() =>{
        const auth = await CheckAuth()
        if(auth === false){
            navigate('/login')
        }
        else{
            const data = await GetUser()
            //console.log(data)
            setUser(data)
        }
    }, [navigate])
    
    useEffect(() => {
        authed()
    }, [authed])

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
                        <ListItem sx={{p: 0}} >
                            <ListItemButton component={Link} to="/user-customers" sx={{ height: 75}}>
                                <ListItemText primary={
                                    <Typography fontWeight="fontWeightBold" variant="body1">Your Customers</Typography>
                                }
                                />
                                <ArrowForwardIos />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem sx={{p: 0}} >
                            <ListItemButton component={Link} to="/logs" sx={{ height: 75}}>
                                <ListItemText primary={
                                    <Typography fontWeight="fontWeightBold" variant="body1">Your Service Logs</Typography>
                                }
                                />
                                <ArrowForwardIos />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem sx={{p: 0}} >
                            <ListItemButton component={Link} to="/adduser" sx={{ height: 75}}>
                                <ListItemText primary={
                                    <Typography fontWeight="fontWeightBold" variant="body1">Add User</Typography>
                                }
                                />
                                <ArrowForwardIos />
                            </ListItemButton>
                        </ListItem>
                        <Divider sx={{ borderBottomWidth: 28 }}/>
                        <ListItem sx={{p: 0}} >
                            <ListItemButton component={Link} to="/edit-account" sx={{ height: 75}}>
                                <ListItemText primary={
                                    <Typography fontWeight="fontWeightBold" variant="body1">Edit Account</Typography>
                                }
                                />
                                <ArrowForwardIos />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem sx={{p: 0}} >
                            <ListItemButton onClick={logout} sx={{ height: 75}}>
                                <ListItemText primary={
                                    <Typography fontWeight="fontWeightBold" variant="body1" color="error.dark">Logout</Typography>
                                }
                                />
                                <ArrowForwardIos />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </List>
                </nav>
            </Box>
            <BottomNavigationBar value={2} />
        </Box>

    )
}

export default Account