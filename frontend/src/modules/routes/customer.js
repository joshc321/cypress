import { Box,Typography, List, Divider, Backdrop, IconButton
 } from '@mui/material'
import { Build, CalendarMonth
 } from '@mui/icons-material'
import BottomNavigationBar from '../components/bottomNavigationBar'
import { useParams } from 'react-router-dom'
import TopBar from '../components/topBar'
import { useState } from 'react'
import  QrCode  from 'react-qr-code'
import * as svg from 'save-svg-as-png'
import GetCustomer from '../components/api/getCustomer'
import SimpleCustomerView from '../components/simpleCustomerView'
import ServiceRecordsList from '../components/serviceRecordsList'
import SimpleSpeedDial from '../components/simpleSpeedDial'
import useAuth from '../components/api/useAuth'

function Customer(){
    useAuth();
    let { slug } = useParams(); 
    const [showQR, setShowQR] = useState(false)
    const [customer, ] = GetCustomer(slug)

    const downloadQR = () => {
        svg.saveSvgAsPng(document.getElementById("12345"), "qrcode.png");
      };

    const onClick = () => {
        setShowQR(!showQR)
    }

    return(
        <div>
            <TopBar onClick={onClick} primary={customer?._id ? customer.first + ' ' + customer.last : 'Customer Not Found'} id={slug} to='/edit-customer' secondary="Information"/>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showQR}
                onClick={onClick}
            >
                <Box sx={{ pt: 25 }} alignItems="center" justifyContent="center">
                    <IconButton onClick={downloadQR}>
                    <QrCode 
                        id="12345"
                        value={`cypr:${slug}`}
                    />
                    </IconButton>
                </Box>
            </Backdrop>
            <Box sx={{pt: 25, pb: 8}}>
            <List>
                <SimpleCustomerView data={customer}/>
                <Box sx={{ml: 2, mt: 1}}>
                    <Typography fontWeight="fontWeightBold" variant="h4">Service Record</Typography>
                </Box>
                <Divider sx={{pt: 1, borderBottomWidth: 3 }}/>
            </List>
            <ServiceRecordsList services={customer?.services} />
            </Box>
            <SimpleSpeedDial 
                actions={[
                    {icon: <CalendarMonth />, name: 'Schedule', linkTo: `/scheduleservice?custid=${customer._id}`},
                    {icon: <Build />, name: 'Service', linkTo: `/new-service/${customer._id}`}
                ]}
            />
            <BottomNavigationBar />
        </div>
    )
}

export default Customer;