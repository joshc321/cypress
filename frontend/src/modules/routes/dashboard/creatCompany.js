import { useState } from 'react'
import { Box, Stack, Typography, Alert, Collapse } from '@mui/material'
import AppForm from '../../components/AppForm'
import TopBarLarge from '../../components/topBarLarge'
import SimpleTextField from '../../components/formComponents/simpleTextField'
import NameField from '../../components/formComponents/nameField'
import EmailField from '../../components/formComponents/emailField'
import PasswordTextField from '../../components/formComponents/passwordTextField'
import PostCompany from '../../components/api/postCompany'
import { useNavigate } from 'react-router-dom'

import MainButton from '../../components/mainbutton'
import PostUser from '../../components/api/postUser'

function CreateCompany()
{
    //---------
    // State
    //---------
    const navigate = useNavigate();
    const [alertOpen, setAlertOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [company, setCompany] = useState('');
    const [user, setUser] = useState({first: '', last: '', email: '', permissionLevel: 1, password: ''});

    const handleChange = (e) => {
        setCompany(e.target.value);
    }
    const handleChangeUser = (prop) => (event) => {
        setUser({ ...user, [prop]: event.target.value });
      };

    const handleSubmit = e => {
        e.preventDefault();
        if(!company || !user.first || !user.last || !user.email || !user.password || user.password.length < 7)
        {
            setError(true);
            return;
        }
        setError(false);
        // post
        PostCompany({name: company})
         .then(rsp => {
            const [body, status] = rsp;
            switch(status)
            {
                case 200:
                    user['company'] = body._id;
                    PostUser(user)
                        .then(rsp => {
                            const [body, status] = rsp;
                            switch(status)
                            {
                                case 200:
                                    setAlertOpen(true);
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
                        }).catch(e => console.error("server error"))
                    break;
                case 401:
                    navigate('/logout');
                    break;
                default:
                    setError(true);
                    setErrorText('Server Error')
            }
          }).catch(e => console.error("server error"));
    }

    return(
        <Box
            component="main"
            sx={{ flexGrow: 1 }}
        >
            <TopBarLarge primary={"Cypress"} secondary={"Create Company"}/>
            <Collapse in={alertOpen}>
                <Alert variant="filled" severity="success" onClose={() => setAlertOpen(false)}>Successfully Created!</Alert>
            </Collapse>
            <AppForm top={1}>
                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2} pt={2}>
                        <Typography fontWeight="fontWeightSemibold" variant="h6">Company</Typography>
                        <SimpleTextField error={error} label="Company Name" value={company} handleChange={handleChange}/>
                        <Typography fontWeight="fontWeightSemibold" variant="h6">Initial User</Typography>
                        <NameField error={error} first={user.first} last={user.last} handleChange={handleChangeUser} />
                        <EmailField error={error} value={user.email} handleChange={handleChangeUser('email')} />
                        <PasswordTextField message={errorText} error={error} password={user.password} handleChange={handleChangeUser('password')} />
                        <MainButton text={"Submit"} />
                    </Stack>
                </form>
            </AppForm>
        </Box>
    )
}

export default CreateCompany;