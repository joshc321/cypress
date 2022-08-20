import { Box, List, Divider } from '@mui/material'
import BottomNavigationBar from '../components/bottomNavigationBar'
import TopBarLarge from '../components/topBarLarge'
import SingleListItem from '../components/singleListItem'
import GetMe from '../components/api/getMe'
import useAuth from '../components/api/useAuth'

function Account(){
    useAuth();
    const [user, loading] = GetMe();

    if(!loading){
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

    )}
    else{
        return(
            'loading...'
        )
    }
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