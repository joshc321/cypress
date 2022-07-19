import { Box,Typography, List, ListItemText,
    ListItemButton, ListItem, Divider,
     ListItemIcon, Fab, Backdrop, IconButton
 } from '@mui/material'
import { ArrowForwardIos,
        PinDrop, Event, LocalAtm, Notes, Note,
        Phone, Add
 } from '@mui/icons-material'
import BottomNavigationBar from '../components/bottomNavigationBar'
import { Link, useParams, useNavigate } from 'react-router-dom'
import TopBar from '../components/topBar'
import { useState, useEffect, useCallback } from 'react'
import  QrCode  from 'react-qr-code'
import * as svg from 'save-svg-as-png'
import GetCustomer from '../components/api/getCustomer'
import GetServiceRecords from '../components/api/getServiceRecords'
import MapsSelector from '../components/api/mapsSelector'
import CreateFullAddress from '../components/helpers/createFullAddress'
import ToStrDate from '../components/helpers/toStringDate'
import useWindowDimensions from '../components/useWindowDimensions'

function Customer(){
    const navigate = useNavigate();
    let { slug } = useParams(); 
    slug = slug.substring(1);
    const [showQR, setShowQR] = useState(false)
    const [status, setStatus] = useState({
        loading: true,
        success: false,
    })
    const [customer, setCustomer] = useState({})
    const [services, setServices] = useState([])
    const [address, setAddress] = useState('')
    const [date, setDate] = useState('')
    const windowDimensions = useWindowDimensions()
    const downloadQR = () => {
        svg.saveSvgAsPng(document.getElementById("12345"), "qrcode.png");
      };

      const getCust = useCallback(async() =>{
        const cust = await GetCustomer(slug)
        try{
            if(cust['status'] === 403){
                navigate('/login')
            }
            else{
                setStatus({...status, success: true})
                let serviceQuery = '';
                for(let i = 0; i < cust.serviceRecords.length; i++){
                    serviceQuery = serviceQuery.concat('&id=', cust.serviceRecords[i]['$oid'])
                }
                let serv = []
                if(cust.serviceRecords.length > 0){
                    serv = await GetServiceRecords(serviceQuery)
                }
                //console.log(cust)
                setCustomer(cust)
                setServices(serv)
                setAddress(CreateFullAddress(cust))
            }
        }
        catch (error){
            setStatus({...status, success: false})
        }
    }, [navigate, slug])

    useEffect(() => {
        getCust();
    }, [getCust])


    useEffect(() => {
        if(customer.date_created){
            let dateLocal = new Date(customer.date_created['$date']).toLocaleDateString()
            setDate(dateLocal)
        }
    }, [customer.date_created])


    const onClick = () => {
        setShowQR(!showQR)
    }

    return(
        <div>
            <TopBar onClick={onClick} primary={status.success ? customer.first + ' ' + customer.last : 'Customer Not Found'} id={slug} secondary="Information"/>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showQR}
                onClick={onClick}
            >
                <Box alignItems="center" justifyContent="center">
                    <IconButton onClick={downloadQR}>
                    <QrCode 
                        id="12345"
                        value={`cypr:${slug}`}
                    />
                    </IconButton>
                </Box>
            </Backdrop>
            <Box sx={{pt: 0, pb: 8}}>
                <List>
                    <ListItem sx={{ p: 0}} onClick={() => MapsSelector(address)}> 
                        <ListItemButton>
                            <ListItemIcon>
                                <PinDrop />
                                <ListItemText 
                                    primary={
                                        <div>
                                            <Typography sx={{ maxWidth: windowDimensions.width * 0.8,  pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{address}</Typography>
                                        </div>
                                    }/>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                    <ListItem> 
                        <ListItemIcon>
                            <Phone />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: windowDimensions.width * 0.8, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{customer.phone}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem> 
                        <ListItemIcon>
                            <Event />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: windowDimensions.width * 0.8, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{date}</Typography>
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
                                        <Typography sx={{ maxWidth: windowDimensions.width * 0.8, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{customer.system}</Typography>
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
                                        <Typography sx={{ maxWidth: windowDimensions.width * 0.8, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{customer.notes}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <Divider sx={{ borderBottomWidth: 18 }}/>
                    <Box sx={{ml: 2, mt: 1}}>
                        <Typography fontWeight="fontWeightBold" variant="h4">Service Record</Typography>
                    </Box>
                    <Divider sx={{pt: 1, borderBottomWidth: 3 }}/>
                </List>
                {
                services.length > 0 ?
                <Box sx={{pt: 0}}>
                    <List>
                        {services.map(({ service, notes, price, date, _id }, index) => (
                        <div key={index}>
                        <ListItem key={_id} sx={{p: 0}}>
                            <ListItemButton component={Link} to={`/logs/:${_id['$oid']}`}>
                                <Event color="secondary"/>
                                <ListItemText 
                                    primary={
                                        <div>
                                        <Typography sx={{pl: 1, fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{ToStrDate(date)}</Typography>
                                        </div>
                                    }/>
                                <ArrowForwardIos />
                            </ListItemButton>    
                            
                        </ListItem>
                        <ListItem> 
                            <ListItemIcon>
                                <Note />
                                <ListItemText 
                                    primary={
                                        <div>
                                            <Typography sx={{ maxWidth: windowDimensions.width * 0.8, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{service}</Typography>
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
                                            <Typography sx={{ maxWidth: windowDimensions.width * 0.8, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{notes}</Typography>
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
                                            <Typography sx={{ maxWidth: windowDimensions.width * 0.8, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{price}</Typography>
                                        </div>
                                    }/>
                            </ListItemIcon>
                        </ListItem>
                        <Divider sx={{pt: 1, borderBottomWidth: 2 }}/>
                        </div>
                        ))}
                    </List>
                </Box> : ''}
            </Box>
            <Fab onClick={()=>navigate(`/new-service/:${slug}`)} color="primary" sx=
                {{
                    position: 'fixed',
                    bottom: 86, 
                    right: 16,
                }}>
                <Add />
            </Fab>
        
            <BottomNavigationBar />
        </div>
    )
}

export default Customer;