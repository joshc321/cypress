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
import putCustomer from '../components/api/putCustomer';
import SimpleFormTopper from '../components/simpleFormTopper';
import CheckAuth from '../components/api/authorized';
import TopBar from '../components/topBar';
import moment from 'moment';
import NameField from '../components/formComponents/nameField';
import PhoneField from '../components/formComponents/phoneField';
import AddressField from '../components/formComponents/addressField';
import DurationField from '../components/formComponents/durationField';
import MultiBaseField from '../components/formComponents/multiBaseField';
import useAuth from '../components/api/useAuth';

function EditCustomer() {
    useAuth();
    let { slug } = useParams(); 

    const navigate = useNavigate();

    const [custCall, loading] = GetCustomer(slug);

    const [error, setError] = useState(false);
    const [customer, setCustomer] = useState(emptyCustomer);
    const [checked, setChecked] = useState(true);
    const [errorText, setErrorText] = useState("Please input required fields")

    useEffect(() => {
        if(!loading) setCustomer({...customer, ...custCall})
    }, [loading])

    const handleChange = (prop) => (event) => {
    setCustomer({ ...customer, [prop]: event.target.value });
    };
    const handleEmbededChange = (prop1) => (prop2) => (event) => {
    setCustomer({ ...customer, [prop1]:{ ...customer[prop1], [prop2]: event.target.value } });
    }


    const handleSubmit = e => {
        e.preventDefault()
        setError(false)

        if(customer.last && customer.first && customer.phone && customer.address){
            putCustomer(customer, slug)
                .then(rsp => {
                    const [_, status] = rsp;
                    switch(status)
                    {
                        case 200:
                            navigate(-1);
                            break;
                        case 422:
                            setError(true);
                            break;
                        case 401:
                            navigate('/logout');
                            break;
                        case 403:
                            setErrorText('Not Authorized');
                            setError(true);
                            break;
                        default:
                            setError(true);
                            console.error(rsp)
                    }
                })
        }
        else setError(true)

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
                            {error ? <Typography variant="body2" color="error" >{errorText}</Typography> : ""}
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

const emptyCustomer = {
    _id: '',
    first: '',
    last: '',
    phone: '',
    address: {
        street: '',
        city: '',
        state: '',
        zip: '',
    },
    system: '',
    notes: '',
    serviceInterval: {
        duration: 1,
        unit: 'years',
    }
}