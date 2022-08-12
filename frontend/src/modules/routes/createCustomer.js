import { IconButton, Box, Typography,
    Stack, TextField, Grid
} from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import MainButton from '../components/mainbutton';
import BottomNavigationBar from '../components/bottomNavigationBar';
import { useState, useEffect, useCallback } from 'react'
import AppForm from '../components/AppForm';
import { useNavigate } from 'react-router-dom';
import PostCustomer from '../components/api/postCustomer'
import NameField from '../components/formComponents/nameField';
import PhoneField from '../components/formComponents/phoneField';
import AddressField from '../components/formComponents/addressField';
import MultiBaseField from '../components/formComponents/multiBaseField';


import SimpleTopBar from '../components/simpleTopBar';

function CreateCustomer() {

    const navigate = useNavigate();


    const [error, setError] = useState(false);
    const [values, setValues] = useState({
        first: '',
        last: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
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
        
        if(values.last === '' || values.first === '' || values.phone === '' || values.address === ''){
            setError(true)
        }

        if(values.last && values.first && values.phone && values.address){
            const data = await PostCustomer(values)
            navigate(`/customer/:${data['id']}`)
        }
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