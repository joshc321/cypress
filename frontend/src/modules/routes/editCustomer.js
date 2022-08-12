import { Box, Typography,
    Stack, TextField, Grid, FormControlLabel, Checkbox, MenuItem
} from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import MainButton from '../components/mainbutton';
import BottomNavigationBar from '../components/bottomNavigationBar';
import { useState, useEffect, useCallback } from 'react'
import AppForm from '../components/AppForm';
import { useNavigate, useParams } from 'react-router-dom';
import GetCustomer from '../components/api/getCustomer';
import UpdateCustomer from '../components/api/updateCustomer';
import SimpleFormTopper from '../components/simpleFormTopper';
import CheckAuth from '../components/api/authorized';
import TopBar from '../components/topBar';
import moment from 'moment';
import NameField from '../components/formComponents/nameField';
import PhoneField from '../components/formComponents/phoneField';
import AddressField from '../components/formComponents/addressField';
import DurationField from '../components/formComponents/durationField';
import MultiBaseField from '../components/formComponents/multiBaseField';

function EditCustomer() {
    let { slug } = useParams(); 
    slug = slug.substring(1);

    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [customer, setCustomer] = useState(customerExample);
    const [checked, setChecked] = useState(true);
    
      const handleChange = (prop) => (event) => {
        setCustomer({ ...customer, [prop]: event.target.value });
      };
      const handleEmbededChange = (prop1) => (prop2) => (event) => {
        setCustomer({ ...customer, [prop1]:{ ...customer[prop1], [prop2]: event.target.value } });
      }


      const handleSubmit = async e => {
        e.preventDefault()
        setError(false)
        
        if(customer.last === '' || customer.first === '' || customer.phone === '' || customer.address === ''){
            setError(true)
        }

        if(customer.last && customer.first && customer.phone && customer.address){
            //console.log(customer);
            UpdateCustomer(customer, slug)
            navigate(-1)
        }
      }

    return(
        <div>
            <TopBar primary={!error ? customer.first + ' ' + customer.last : 'Customer Not Found'} secondary="Edit Customer"/>
            <Box sx={{ pt: 25, pb: 10 }}>
                <AppForm top={1}>

                    <form noValidate onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <SimpleFormTopper text="Info" label="Simple" checked={checked} setChecked={setChecked} />
                            <NameField first={customer.first} last={customer.last} error={error} handleChange={handleChange} />
                            <PhoneField phone={customer.phone} handleChange={handleChange} error={error} />
                            <AddressField address={customer.address} handleChange={handleEmbededChange('address')} error={error} />
                            <MultiBaseField label={"System"} value={customer.system} handleChange={handleChange('system')} />
                            <MultiBaseField label={"Notes"} value={customer.notes} handleChange={handleChange('notes')} />
                            {!checked ?
                            <DurationField duration={customer.serviceInterval} handleChange={handleEmbededChange('serviceInterval')}/>
                            : ''}
                            {error ? <Typography variant="body2" color="error" >Please input required fields</Typography> : ""}
                            <MainButton text={"Update"} />
                        </Stack>
                    </form>
                </AppForm>
            </Box>
            <BottomNavigationBar />
        </div>
    )
}

export default EditCustomer

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
    ]
}