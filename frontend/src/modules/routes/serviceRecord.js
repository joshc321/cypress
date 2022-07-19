import { Box,Typography, List, ListItemText,
    ListItemButton, ListItem, Divider, 
    ListItemIcon
 } from '@mui/material'
import { ArrowForwardIos,
        PinDrop, Event, LocalAtm, Notes, Note
 } from '@mui/icons-material'
import BottomNavigationBar from '../components/bottomNavigationBar'
import { useState, useEffect, useCallback } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import TopBar from '../components/topBar'
import MapsSelector from '../components/api/mapsSelector'
import GetServiceRecords from '../components/api/getServiceRecords'
import CreateFullAddress from '../components/helpers/createFullAddress'
import ToStrDate from '../components/helpers/toStringDate'
import GetCustomer from '../components/api/getCustomer'
import CheckAuth from '../components/api/authorized'
import useWindowDimensions from '../components/useWindowDimensions'

function ServiceRecord(){
    let { slug } = useParams(); 
    slug = slug.substring(1);
    const navigate = useNavigate()
    const [service, setService] = useState({})
    const [address, setAddress] = useState('')
    const [customer, setCusomter] = useState({})
    const [customerId, setCustomerId] = useState('')
    const [error, setError] = useState(false)
    const windowDimensions = useWindowDimensions()

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

    const getData = useCallback(async() =>{
        const serviceId = `id=${slug}`
        const data = await GetServiceRecords(serviceId)
        try{
            const serv = data[0]
            const custId = serv['customer']['$oid']
            const cust = await GetCustomer(custId)
            setCustomerId(custId)
            setCusomter(cust)
            setService(serv)
            //console.log(serv)
            setAddress(CreateFullAddress(serv))
        }
        catch (error){
            setError(true)
        }
    },[slug])

    useEffect(() => {
        getData();
    }, [getData])

    return(
        <div>
            <TopBar primary="Service Record" secondary={!error ? "Information" : "Service Not Found"}/>
            
            
            <Box sx={{pt: 25, pb: 8}}>
            {!error ?
                <List>
                    <ListItem sx={{p: 0}}>
                        <ListItemButton component={Link} to={`/customer/:${customerId}`}>
                            <ListItemText 
                                primary={
                                    <div>
                                    <Typography sx={{ fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>Customer</Typography>
                                    <Typography sx={{ fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightBold", fontSize: 18 }}>{customer.first + ' ' +customer.last}</Typography>
                                    </div>
                                }/>
                            <ArrowForwardIos />
                        </ListItemButton>    
                    </ListItem>
                    <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/>
                    <ListItem sx={{p: 0}} onClick={() => MapsSelector(address)}>
                        <ListItemButton> 
                        <ListItemIcon>
                            <PinDrop />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: windowDimensions.width * 0.8, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{address}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                    <ListItem> 
                        <ListItemIcon>
                            <Event />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: windowDimensions.width * 0.8, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{ToStrDate(service.date)}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem> 
                        <ListItemIcon>
                            <LocalAtm />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: windowDimensions.width * 0.8, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{service.price ? '$ '+service.price : 'No Price'}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/>
                    <ListItem> 
                        <ListItemIcon>
                            <Note />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: windowDimensions.width * 0.8, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{service.service}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem> 
                        <ListItemIcon>
                            <Notes />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: windowDimensions.width * 0.8, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{service.notes}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/>
                </List>
            : ''
            }   
            </Box>

            <BottomNavigationBar />
        </div>
    )
}

export default ServiceRecord;