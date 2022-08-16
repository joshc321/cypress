import { IconButton, Box, Typography,
    Stack, TextField
} from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import MainButton from '../components/mainbutton';
import BottomNavigationBar from '../components/bottomNavigationBar';
import { useState, useEffect, useCallback } from 'react'
import AppForm from '../components/AppForm';
import { useNavigate } from 'react-router-dom';
import CheckAuth from '../components/api/authorized'
import GetUser from '../components/api/getUser';
import UpdateUser from '../components/api/updateUser';
import SimpleTopBar from '../components/simpleTopBar';
import SimpleFormTopper from '../components/simpleFormTopper';
import NameField from '../components/formComponents/nameField';
import EmailField from '../components/formComponents/emailField';

function EditAccount() {

    const navigate = useNavigate();

    const [userId, setUserId] = useState('')
    const [error, setError] = useState(false);
    const [values, setValues] = useState(userDemo);


      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };


      const handleSubmit = (e) => {
        e.preventDefault()
        setError(false)
        
        if(values.email === ''|| values.last === '' || values.first === ''){
            setError(true)
        }

        if(values.email && values.last && values.first){
            //console.log(values)
            UpdateUser(values, userId)
            navigate(-1)
        }
      }

    return(
        <Box sx={{ pb: 10 }}>
            <SimpleTopBar to={-1} text="Edit Account"/>
            <AppForm top={1}>

                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <SimpleFormTopper text="Info" />
                        <NameField first={values.first} last={values.last} handleChange={handleChange} error={error} />
                        <EmailField value={values.email} error={error} handleChange={handleChange('email')} />
                        {error ? <Typography variant="body2" color="error" >Please input required fields</Typography> : ""}
                        <MainButton text={"Update"} />
                    </Stack>
                </form>
            </AppForm>
            <BottomNavigationBar />
        </Box>
    )
}

export default EditAccount


const userDemo = {
    first: 'Josh',
    last: 'Cordero',
    email: 'Josh@email.com',
    permissionLevel: 2,
    company: '9a8sd7f09a8sd',
    password: 'my-password'
}