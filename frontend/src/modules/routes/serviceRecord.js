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
import moment from 'moment'
import SimpleServiceView from '../components/simpleServiceView'

function ServiceRecord(){
    let { slug } = useParams(); 

    const [service, setService] = useState(serviceRecordExample)

    const [error, setError] = useState(false)
    const windowDimensions = useWindowDimensions()



    return(
        <div>
            <TopBar primary="Service Record" secondary={!error ? "Information" : "Service Not Found"}/>            
            <SimpleServiceView data={service} />
            <BottomNavigationBar />
        </div>
    )
}

export default ServiceRecord;

const serviceRecordExample = {
    date: moment(),
    address: {
        street: 'test',
        city: 'uhhh',
        state: 'CA',
        zip: 'idk'
    },
    service: 'some things',
    notes: 'ds;flaksd',
    bill: '43',
    cost: '23',
    customer: {
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
    }
}