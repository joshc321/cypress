import { Box, Stack, 
    } from '@mui/material';
import AppForm from '../components/AppForm';
import PasswordTextField from '../components/formComponents/passwordTextField';
import BottomNavigationBar from '../components/bottomNavigationBar';
import { useState } from 'react';
import MainButton from '../components/mainbutton';
import { useNavigate } from 'react-router-dom';
import PostUser from '../components/api/postUser';
import SimpleTopBar from '../components/simpleTopBar';
import SimpleFormTopper from '../components/simpleFormTopper';
import NameField from '../components/formComponents/nameField';
import EmailField from '../components/formComponents/emailField';
import SelectionField from '../components/formComponents/selectionField';
import useAuth from '../components/api/useAuth';
import GetMe from '../components/api/getMe';

function AddUser() {

    useAuth();

    const navigate = useNavigate();
    const [self, loading] = GetMe()
    const [errorText, setErrorText] = useState("Please input required fields")
    const [error, setError] = useState(false);
    const [values, setValues] = useState(emptyUser);
    

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };


      const handleSubmit = e => {
        e.preventDefault()
        setError(false)
        setErrorText('Please input required fields')

        if(values.email && values.password && values.last && values.first){
            PostUser(values)
              .then(rsp => {
                const [body, status] = rsp;
                switch(status)
                {
                    case 200:
                        navigate(`/user/${body._id}`);
                        break;
                    case 422:
                        setError(true);
                        setErrorText('Invalid Email or Password');
                        break;
                    case 401:
                        navigate('/logout');
                        break;
                    default:
                        setError(true);
                        setErrorText('Server Error')
                }
              }).catch(e => console.log("server error"))
        }
        else setError(true)
      }

    return(
        <Box sx={{ pb: 10 }}>
            <SimpleTopBar to={-1} text="Add User"/>
            <AppForm top={1}>
                {!loading &&
                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <SimpleFormTopper text="Info" />
                        <NameField first={values.first} last={values.last} handleChange={handleChange} error={error} />
                        <EmailField value={values.email} error={error} handleChange={handleChange('email')} />
                        <SelectionField 
                            label="Role"
                            value={values.permissionLevel}
                            handleChange={handleChange('permissionLevel')}
                            options={permissions.filter(perm => perm.value <= self?.permissionLevel)}
                        />
                        <PasswordTextField error={error} message={errorText} password={values.password} handleChange={handleChange('password')}/>
                        <MainButton text={"Create"} />
                    </Stack>
                </form>}
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

const emptyUser = {
    first: '',
    last: '',
    email: '',
    permissionLevel: 0,
    password: ''
}