import { Box,Typography, List, ListItemText,
    ListItemButton, ListItem, Divider, 
 } from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'
import BottomNavigationBar from '../components/bottomNavigationBar'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import TopBar from '../components/topBar'
import CheckAuth from '../components/api/authorized'

function refreshMessages() {
    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
  
    return Array.from(new Array(50)).map(
      () => serviceExamples[getRandomInt(serviceExamples.length)],
    );
  }

function Logs() {
    const [messages, setMessages] = useState(() => refreshMessages());
    const navigate = useNavigate()
    useEffect(() => {
        setMessages(refreshMessages());
    }, [setMessages]);
    
    const authed = useCallback(async() =>{
        const auth = await CheckAuth()
        if(auth === false){
            navigate('/login')
        }
        else{
        }
    },[navigate])
    
    useEffect(() => {
        authed()
    }, [authed])


    return (
        <Box>
            <TopBar primary={"Joshua Cordero"} secondary={"Service Records"}/>
            <Box sx={{pt: 25, pb: 8}}>
                <List>
                    {messages.map(({ name, description, date, id }, index) => (
                    <div>
                    <ListItem key={id} sx={{p: 0}}>
                        <ListItemButton component={Link} to={`/logs/:${id}`}>
                            <ListItemText 
                                primary={
                                    <div>
                                    <Typography sx={{ fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{date}</Typography>
                                    <Typography sx={{ fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightBold", fontSize: 18 }}>{name}</Typography>
                                    </div>
                                } 
                                secondary={
                                    <Typography sx={{ fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightLight", fontSize: 13 }}>{description}</Typography>
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
        </Box>
    )
}

export default Logs;

//<Typography sx={{ fontFamily: 'Proima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>Your Customers</Typography>
//<Typography fontWeight="fontWeightBold" variant="body1">Your Customers</Typography>

const serviceExamples = [
    {
      id: '9367812',
      name: 'Joe Dirt',
      description: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
      date: 'December 17, 1995',
    },
    {
      id: '9367193',
      name: 'Abrial Dias',
      description: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      date: 'June 3, 2003',
    },
    {
        id: '8103651',
        name: 'Azikil Dirt',
        description: "doingDi some oteha sdufa",
        date: 'December 17, 3002',
    },
  ];
  