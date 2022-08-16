import {IconButton, Box, Typography, Stack, 
        TextField,
    } from '@mui/material';
import { ArrowBackIosNew
 } from '@mui/icons-material';
import AppForm from '../components/AppForm';
import PasswordTextField from '../components/formComponents/passwordTextField';
import BottomNavigationBar from '../components/bottomNavigationBar';
import { useState, useEffect, useCallback } from 'react';
import MainButton from '../components/mainbutton';
import { useNavigate } from 'react-router-dom';
import PostUser from '../components/api/postUser';
import CheckAuth from '../components/api/authorized';
import SimpleTopBar from '../components/simpleTopBar';
import SimpleFormTopper from '../components/simpleFormTopper';
import NameField from '../components/formComponents/nameField';
import EmailField from '../components/formComponents/emailField';
import SelectionField from '../components/formComponents/selectionField';

function AddUser() {

    const navigate = useNavigate();

    const [errorText, setErrorText] = useState("Please input required fields")
    const [error, setError] = useState(false);
    const [values, setValues] = useState(userDemo);
    

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };


      const handleSubmit = async e => {
        e.preventDefault()
        setError(false)
        setErrorText('Please input required fields')
        if(values.email === '' || values.password === '' || values.last === '' || values.first === ''){
            setError(true)
        }

        if(values.email && values.password && values.last && values.first){
            //console.log(values);
            const result = await PostUser(values)
            if(result.status === 400){
                setErrorText(result.message)
                setError(true)
            }
            //console.log(result)
        }
      }

    return(
        <Box sx={{ pb: 10 }}>
            <SimpleTopBar to={-1} text="Add User"/>
            <AppForm top={1}>

                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <SimpleFormTopper text="Info" />
                        <NameField first={values.first} last={values.last} handleChange={handleChange} error={error} />
                        <EmailField value={values.email} error={error} handleChange={handleChange('email')} />
                        <SelectionField 
                            label="Role"
                            value={values.permissionLevel}
                            handleChange={handleChange('permissionLevel')}
                            options={permissions.filter(perm => perm.value <= values.permissionLevel)}
                        />
                        <PasswordTextField error={error} message={errorText} password={values.password} handleChange={handleChange('password')}/>
                        <MainButton text={"Create"} />
                    </Stack>
                </form>
            </AppForm>
            <BottomNavigationBar />
        </Box>
    )
}

export default AddUser

const permissions = [
    {
        value: 0,
        text: 'Viewer',
    },
    {
        value: 1,
        text: 'Editor'
    },
    {
        value: 2,
        text: 'Admin',
    }
]

const userDemo = {
    first: 'Josh',
    last: 'Cordero',
    email: 'Josh@email.com',
    permissionLevel: 0,
    company: '9a8sd7f09a8sd',
    password: 'my-password'
}