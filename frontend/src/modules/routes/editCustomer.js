import { Box, Typography,
    Stack
} from '@mui/material';
import MainButton from '../components/mainbutton';
import BottomNavigationBar from '../components/bottomNavigationBar';
import { useState, useEffect } from 'react'
import AppForm from '../components/AppForm';
import { useNavigate, useParams } from 'react-router-dom';
import GetCustomer from '../components/api/getCustomer';
import putCustomer from '../components/api/putCustomer';
import SimpleFormTopper from '../components/simpleFormTopper';
import TopBar from '../components/topBar';
import NameField from '../components/formComponents/nameField';
import PhoneField from '../components/formComponents/phoneField';
import AddressField from '../components/formComponents/addressField';
import DurationField from '../components/formComponents/durationField';
import MultiBaseField from '../components/formComponents/multiBaseField';
import useAuth from '../components/api/useAuth';
import SelectionField from '../components/formComponents/selectionField';

function EditCustomer() {
    useAuth();
    let { slug } = useParams(); 

    const navigate = useNavigate();

    const [custCall, loading] = GetCustomer(slug);

    const [error, setError] = useState(false);
    const [customer, setCustomer] = useState(emptyCustomer);
    const [checked, setChecked] = useState(true);
    const [errorText, setErrorText] = useState("Please input required fields")
    const [status, setStatus] = useState('active');

    useEffect(() => {
        if(!loading) 
        {
            setCustomer({...customer, ...custCall})
            if(custCall?.active === false) setStatus('disabled')
            else if(custCall?.straggler === true) setStatus('straggler')
            else if(custCall?.straggler === false) setStatus('active')
        }
    }, [loading, custCall])

    const handleChange = (prop) => (event) => {
    setCustomer({ ...customer, [prop]: event.target.value });
    };
    const handleEmbededChange = (prop1) => (prop2) => (event) => {
    setCustomer({ ...customer, [prop1]:{ ...customer[prop1], [prop2]: event.target.value } });
    }

    const handleStatusChange = (event) => {
        switch(event.target.value)
        {
            case 'disabled':
                setStatus('disabled');
                setCustomer({ ...customer, 'active': false });
                break;
            case 'straggler':
                setStatus('straggler');
                setCustomer({ ...customer, 'straggler': true, 'active': true });
                break;
            case 'active':
                setCustomer({ ...customer, 'straggler': false, 'active': true });
                setStatus('active')
                break;
            default:
                setCustomer({ ...customer, 'straggler': false, 'active': true });
                setStatus('active');
        }
    }


    const handleSubmit = e => {
        e.preventDefault()
        setError(false)

        if(customer.last && customer.first && customer.phone && customer.address){
            putCustomer(customer, slug)
                .then(rsp => {
                    const [, status] = rsp;
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
                }).catch(e => console.log("server error"))
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
                            <>
                                <DurationField duration={customer.serviceInterval} handleChange={handleEmbededChange('serviceInterval')}/>
                                <SelectionField label="Status" value={status} handleChange={handleStatusChange} options={customerOptions}/>
                            </>
                            : ''}
                            {error ? <Typography variant="body2" color="error" >{errorText}</Typography> : ""}
                            <MainButton text={"Update"} value={false} handleChange={handleChange('straggler')}/>
                        </Stack>
                    </form>
                </AppForm>
            </Box>
            <BottomNavigationBar />
        </div>
    )
}

export default EditCustomer

const customerOptions = [
    {
        value: 'straggler',
        text: 'straggler'
    },
    {
        value: 'active',
        text: 'active',
    },
    {
        value: 'disabled',
        text: 'disabled',
    }
]

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
    },
    straggler: false,
    active: true,
}