import { Box,Typography, List, ListItemText,
    ListItemButton, ListItem, Divider,
     ListItemIcon, Fab, Backdrop, IconButton
 } from '@mui/material'
import { Schedule, Build, CalendarMonth
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
import SimpleCustomerView from '../components/simpleCustomerView'
import ServiceRecordsList from '../components/serviceRecordsList'
import SimpleSpeedDial from '../components/simpleSpeedDial'
import moment from 'moment'
import useAuth from '../components/api/useAuth'

function Customer(){
    useAuth();
    let { slug } = useParams(); 
    const [showQR, setShowQR] = useState(false)
    const [customer, loading] = GetCustomer(slug)

    const downloadQR = () => {
        svg.saveSvgAsPng(document.getElementById("12345"), "qrcode.png");
      };

    const onClick = () => {
        setShowQR(!showQR)
    }

    return(
        <div>
            <TopBar onClick={onClick} primary={!loading ? customer.first + ' ' + customer.last : 'Customer Not Found'} id={slug} secondary="Information"/>
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
                <SimpleCustomerView data={customer}/>
                <Box sx={{ml: 2, mt: 1}}>
                    <Typography fontWeight="fontWeightBold" variant="h4">Service Record</Typography>
                </Box>
                <Divider sx={{pt: 1, borderBottomWidth: 3 }}/>
            </List>
            <ServiceRecordsList services={customer.services} />
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

const customerExample = {
    _id: '98s7fd098',
    first: 'Joshua',
    last: 'Cordero',
    phone: '951 537 4949',
    address: {
        street: '1123 S State Street',
        city: 'hemet',
        state: 'CA',
        zip: '92543',
    },
    system: 'has a thing',
    notes: 'some notes here',
    lastServiced: moment(),
    serviceInterval: {
        duration: 1,
        unit: 'years',
    },
    nextService: moment().add(1, 'year'),
    straggler: false,
    active: true,
    services: [
        {
            _id: '0897ydfs98g',
            date: moment(),
            service: 'serviced some things',
            notes: 'notes mroe ww',
            bill: '32',
            cost: '10',
        },
        {
            _id: '0897ydfs98g',
            date: moment(),
            service: 'serviced some things',
            notes: 'notes mroe ww',
            bill: '32',
            cost: '10',
        },
    ],
    scheduledService: {
        _id: '28093489023',
        date: moment(),
        service: 'did some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsthingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsthingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsthingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsthingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsthingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some things',
        notes: 'they were there',
        estimate: '32.32',
        customer: 
        {
          _id: 'a9s8df70a9d',
          first: 'Coral',
          last: 'Raymond',
          address: '1123 S State Street Hemet CA'
        }
    }
}