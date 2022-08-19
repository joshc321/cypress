import { Typography , 
    Stack, Checkbox,
    FormControlLabel,
    Grid, Link
} from '@mui/material';
import { useState } from 'react';
import AppForm from '../components/AppForm'
import TopBase from '../components/topbase';
import PasswordTextField from '../components/formComponents/passwordTextField';
import MainButton from '../components/mainbutton'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import PostLogin from '../components/api/postLogin'
import EmailField from '../components/formComponents/emailField';


function Login(){

    const navigate = useNavigate();

    const [error, setError] = useState(false)
    const [checked, setChecked] = useState(false)
    const [values, setValues] = useState({
        email: '',
        password: '',
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
      
      const handleCheck = () => {
          setChecked(!checked)
      }

      const handleSubmit = e => {
        e.preventDefault()
        setError(false)
        
        if(values.email === '' || values.password === ''){
            setError(true)
        }

        if(values.email && values.password){

            PostLogin(values)
              .then((rsp) =>{
                    if(rsp?.error) setError(true)
                    else if(rsp?.token)
                    {
                        if(checked) Cookies.set('access_token', rsp.token, { expires: 7 })
                        else Cookies.set('access_token', rsp.token)
                        navigate('/')
                    }
                    else console.log(rsp)
                })
              .catch(e => console.log(e))
        }
      }

    return(
        <div>
            <TopBase page={"Login"}/>

            <AppForm>
           <form noValidate onSubmit={handleSubmit}>
               <Stack spacing={2}>
                    <EmailField value={values.email} error={error} handleChange={handleChange('email')} />
                    <PasswordTextField error={error} password={values.password} handleChange={handleChange('password')}/>
                    <Grid>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid>
                                
                                <FormControlLabel control={
                                    <Checkbox 
                                        checked={values.checked}
                                        onChange={handleCheck}
                                        color="primary"
                                    />
                                } label={<Typography variant="body2"> Remember me</Typography>} />
                                
                            </Grid>
                            <Grid>
                                <Link onClick={()=> navigate('/forgot')} color='inherit' underline="hover" variant='body1'>Forgot password?</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <MainButton text={"Login"} />
                </Stack>
            </form>
            </AppForm>
        </div>
    );
}

export default Login;