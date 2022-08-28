import { Box, List, Divider } from '@mui/material'
import BottomNavigationBar from '../components/bottomNavigationBar'
import TopBarLarge from '../components/topBarLarge'
import SingleListItem from '../components/singleListItem'
import GetMe from '../components/api/getMe'
import useAuth from '../components/api/useAuth'

function Account(){
    useAuth();
    const [user, loading] = GetMe();
    
    return(
        <Box sx={{pb: 10}}>
            <TopBarLarge primary={"Cypress"} secondary={!loading && (user.first + ' ' +user.last)}/>
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

export default Account;