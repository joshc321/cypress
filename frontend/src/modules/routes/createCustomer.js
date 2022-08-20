import { Box, Typography,
    Stack
} from '@mui/material';
import MainButton from '../components/mainbutton';
import BottomNavigationBar from '../components/bottomNavigationBar';
import { useState } from 'react'
import AppForm from '../components/AppForm';
import { useNavigate } from 'react-router-dom';
import NameField from '../components/formComponents/nameField';
import PhoneField from '../components/formComponents/phoneField';
import AddressField from '../components/formComponents/addressField';
import MultiBaseField from '../components/formComponents/multiBaseField';


import SimpleTopBar from '../components/simpleTopBar';
import postCustomer from '../components/api/postCustomer';
import useAuth from '../components/api/useAuth';

function CreateCustomer() {

    useAuth();
    const navigate = useNavigate();


    const [error, setError] = useState(false);
    const [values, setValues] = useState({
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
        notes: ''
      });
      

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
      const handleEmbededChange = (prop1) => (prop2) => (event) => {
        setValues({ ...values, [prop1]:{ ...values[prop1], [prop2]: event.target.value } });
      }


      const handleSubmit = async e => {
        e.preventDefault()
        setError(false)

        if(values.last && values.first && values.phone && values.address){
            postCustomer(values)
                .then(rsp => {
                    const [body, status] = rsp;
                    switch(status)
                    {
                        case 200:
                            navigate(`/customer/${body._id}`);
                            break;
                        case 422:
                            setError(true);
                            break;
                        case 401:
                            navigate('/logout');
                            break;
                        default:
                            setError(true);
                            console.log(rsp)
                    }
                })
        }
        else setError(true)
      }

    return(
        <Box sx={{ pb: 10 }}>
            <SimpleTopBar to={-1} text={"Create Customer"}/>
            <AppForm top={1}>
                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <Box sx={{ mt: 2}}>
                            <Typography fontWeight="fontWeightSemibold" variant="h6">Info</Typography>
                        </Box>
                        <NameField first={values.first} last={values.last} error={error} handleChange={handleChange} />
                        <PhoneField phone={values.phone} handleChange={handleChange} error={error} />
                        <AddressField address={values.address} handleChange={handleEmbededChange('address')} error={error} />
                        <MultiBaseField label={"System"} value={values.system} handleChange={handleChange('system')} />
                        <MultiBaseField label={"Notes"} value={values.notes} handleChange={handleChange('notes')} />
                        {error ? <Typography variant="body2" color="error" >Please input required fields</Typography> : ""}
                        <MainButton text={"Create"} />
                    </Stack>
                </form>
            </AppForm>
            <BottomNavigationBar />
        </Box>
    )
}

export default CreateCustomer