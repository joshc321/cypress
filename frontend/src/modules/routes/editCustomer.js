import { IconButton, Box, Typography,
    Stack, TextField, Grid
} from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import MainButton from '../components/mainbutton';
import BottomNavigationBar from '../components/bottomNavigationBar';
import { useState, useEffect, useCallback } from 'react'
import AppForm from '../components/AppForm';
import { useNavigate, useParams } from 'react-router-dom';
import GetCustomer from '../components/api/getCustomer';
import UpdateCustomer from '../components/api/updateCustomer';
import CheckAuth from '../components/api/authorized';
import TopBar from '../components/topBar';
import moment from 'moment';

function EditCustomer() {
    let { slug } = useParams(); 
    slug = slug.substring(1);

    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [customer, setCustomer] = useState(customerExample);
    
      const handleChange = (prop) => (event) => {
        setCustomer({ ...customer, [prop]: event.target.value });
      };


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
                            <Box sx={{ mt: 2}}>
                                <Typography fontWeight="fontWeightSemibold" variant="h6">Info</Typography>
                            </Box>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                <TextField 
                                    label="First name"
                                    autoComplete="given-name"
                                    sx={{width: "49%"}}
                                    error={error}
                                    value={customer.first}
                                    onChange={handleChange('first')}
                                    required
                                />
                                <TextField 
                                    label="Last name"
                                    autoComplete="family-name"
                                    sx={{width: "49%"}}
                                    error={error}
                                    value={customer.last}
                                    onChange={handleChange('last')}
                                    required
                                />
                            </Grid>
                            <TextField 
                                type="phone"
                                label="Phone"
                                autoComplete="tel-national"
                                fullWidth
                                error={error}
                                value={customer.phone}
                                onChange={handleChange('phone')}
                                required
                            />
                            <TextField 
                                autoComplete="street-address"
                                label="Address"
                                fullWidth
                                error={error}
                                value={customer.address}
                                onChange={handleChange('address')}
                                required
                            />
                            <TextField 
                                label="City"
                                autoComplete="address-level2"
                                fullWidth
                                value={customer.city}
                                onChange={handleChange('city')}
                            />
                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                <TextField 
                                    label="State"
                                    autoComplete="address-level1"
                                    sx={{width: "49%"}}
                                    value={customer.state}
                                    onChange={handleChange('state')}
                                />
                                <TextField 
                                    label="Zip"
                                    autoComplete="postal-code"
                                    sx={{width: "49%"}}
                                    value={customer.zip}
                                    onChange={handleChange('zip')}
                                />
                            </Grid>
                            <TextField 
                                label="System"
                                fullWidth
                                value={customer.system}
                                onChange={handleChange('system')}
                            />
                            <TextField 
                                label="Notes"
                                autoComplete="address-level2"
                                fullWidth
                                value={customer.notes}
                                onChange={handleChange('notes')}
                            />
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