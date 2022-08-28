import { Box, Stack
} from '@mui/material';
import MainButton from '../components/mainbutton';
import BottomNavigationBar from '../components/bottomNavigationBar';
import { useState } from 'react'
import AppForm from '../components/AppForm';
import { useNavigate, useParams } from 'react-router-dom';
import postService from '../components/api/postService'
import SimpleFormTopper from '../components/simpleFormTopper';
import AddressField from '../components/formComponents/addressField';
import DateField from '../components/formComponents/dateField';
import PriceField from '../components/formComponents/priceField';
import MultiBaseField from '../components/formComponents/multiBaseField';
import moment from 'moment';
import SimpleTopBar from '../components/simpleTopBar';
import useAuth from '../components/api/useAuth';

function NewService() {

    useAuth();
    const navigate = useNavigate();

    let { slug } = useParams(); 
    const [checked, setChecked] = useState(true);
    const [values, setValues] = useState(emptyServiceRecord);
    
      const handleCheck = (_) => {
          setChecked(!checked)
      }
      const handleEmbededChange = (prop1) => (prop2) => (event) => {
        setValues({ ...values, [prop1]:{ ...values[prop1], [prop2]: event.target.value } });
      }

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

      const handleSubmit = e => {
        e.preventDefault()
        
        postService(values, slug)
            .then(rsp => {
                const [body, status] = rsp;
                switch(status)
                {
                    case 200:
                        navigate(-1);
                        break;
                    case 422:
                        console.error('Server error uproccesable')
                        break;
                    case 401:
                        navigate('/logout');
                        break;
                    default:
                        console.error(rsp)
                }})
      }

    return(
        <Box sx={{ pb: 10 }}>
            <SimpleTopBar to={-1} text={"New Service Record"} />
            
            <AppForm top={1}>

                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <SimpleFormTopper text="Info" label="Default" checked={checked} setChecked={handleCheck} />
                        <DateField value={values.date} handleChange={handleChange('date')} required={false} />

                        {!checked ? 
                            <AddressField address={values.address} handleChange={handleEmbededChange('address')} required={false} />
                        : ''}
                        
                        <MultiBaseField label={"Service"} value={values.service} handleChange={handleChange('service')} />
                        <MultiBaseField label={"Notes"} value={values.notes} handleChange={handleChange('notes')} />
                        <PriceField value={values.cost} handleChange={handleChange('cost')} label="Cost"/>
                        <PriceField value={values.bill} handleChange={handleChange('bill')} label="Bill"/>
                        <MainButton text={"Create"} />
                    </Stack>
                </form>
            </AppForm>
            <BottomNavigationBar />
        </Box>
    )
}

export default NewService


const emptyServiceRecord = {
    date: moment(),
    address: {
        street: '',
        city: '',
        state: '',
        zip: ''
    },
    service: '',
    notes: '',
    bill: '',
    cost: '',
}