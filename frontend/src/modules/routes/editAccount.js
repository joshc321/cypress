import { Box, Typography,
    Stack
} from '@mui/material';
import MainButton from '../components/mainbutton';
import BottomNavigationBar from '../components/bottomNavigationBar';
import { useState, useEffect } from 'react'
import AppForm from '../components/AppForm';
import { useNavigate } from 'react-router-dom';
import putUser from '../components/api/putUser';
import SimpleTopBar from '../components/simpleTopBar';
import SimpleFormTopper from '../components/simpleFormTopper';
import NameField from '../components/formComponents/nameField';
import EmailField from '../components/formComponents/emailField';
import GetMe from '../components/api/getMe';
import useAuth from '../components/api/useAuth';

function EditAccount() {

    const navigate = useNavigate();
    useAuth();
    const [user, loading] = GetMe();
    const [error, setError] = useState(false);
    const [values, setValues] = useState(emptyUser);

    useEffect(() => {
        if(!loading) setValues({...values, ...user})
    }, [loading])

    const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    };


    const handleSubmit = (e) => {
    e.preventDefault()
    setError(false)
    
    if(values.email && values.last && values.first){
        putUser(values, values._id)
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
                    default:
                        setError(true);
                        console.error(rsp)
                }
            }).catch(e => console.log("server error"))
    }
    else setError(true)
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

export default EditAccount;

const emptyUser = 
{
    _id: '',
    first: '',
    last: '',
    email: '',
}