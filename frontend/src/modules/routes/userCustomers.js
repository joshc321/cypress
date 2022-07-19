import { Typography, List, ListItemButton, ListItem,
        ListItemText, Box, Divider
} from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'
import BottomNavigationBar from '../components/bottomNavigationBar'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import TopBar from '../components/topBar'
import CheckAuth from '../components/api/authorized'


function refreshCustomers() {
    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
  
    return Array.from(new Array(50)).map(
      () => customerExamples[getRandomInt(customerExamples.length)],
    );
  }

function UserCustomers() {
    const navigate = useNavigate()
    const [messages, setMessages] = useState(() => refreshCustomers());

    const authed = useCallback(async() =>{
        const auth = await CheckAuth()
        if(auth === false){
            navigate('/login')
        }
        else{
        }
    }, [navigate])
    
    useEffect(() => {
        authed()
    }, [authed])

    useEffect(() => {
        setMessages(refreshCustomers());
    }, [setMessages]);

    return(
        <div>
            <TopBar primary="Joshua Cordero" secondary="Customers"/>
            <Box sx={{pt: 25, pb: 8}}>
                <List>
                    {messages.map(({ name, phone, address, id }, index) => (
                    <div key={index}>
                    <ListItem key={id} sx={{p: 0}}>
                        
                        <ListItemButton component={Link} to={`/customer/:${id}`}>
                            <ListItemText 
                                primary={
                                    <div>
                                    <Typography sx={{ fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{phone}</Typography>
                                    <Typography sx={{ fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightBold", fontSize: 18 }}>{name}</Typography>
                                    </div>
                                } 
                                secondary={
                                    <Typography sx={{ fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightLight", fontSize: 13 }}>{address}</Typography>
                                } />
                            <ArrowForwardIos />
                        </ListItemButton>    
                    </ListItem>
                    
                    <Divider variant="middle"/>
                    </div>
                    ))}
                </List>
            </Box>
            <BottomNavigationBar />
        </div>
    )
}

export default UserCustomers;


const customerExamples = [
    {
      id: '2341234',
      name: 'Joe Dirt',
      phone: '902 873 4721',
      address: 'Hemet CA',
    },
    {
      id: '2342342',
      name: 'Abrial Dias',
      phone: '823 876 1234',
      address: 'Western, CA',
    },
    {
        id: '927381',
        name: 'Azikil Dirt',
        phone: "093 234 1293",
        address: 'joe mamas houe',
    },
  ];