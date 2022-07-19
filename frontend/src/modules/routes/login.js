import { Typography , 
    TextField, Stack, Checkbox,
    FormControlLabel,
    Grid, Link
} from '@mui/material';
import { useState } from 'react';
import AppForm from '../components/AppForm'
import TopBase from '../components/topbase';
import PasswordTextField from '../components/passwordTextField';
import MainButton from '../components/mainbutton'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import PostLogin from '../components/api/postLogin'


function Login(){

    const navigate = useNavigate();

    const [error, setError] = useState(false)
    const [values, setValues] = useState({
        email: '',
        password: '',
        checked: false,
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
      
      const handleCheck = () => {
          setValues({
              ...values,
              checked: !values.checked
          })
      }

      const handleSubmit = async e => {
        e.preventDefault()
        setError(false)
        
        if(values.email === '' || values.password === ''){
            setError(true)
        }

        if(values.email && values.password){
            //console.log(values);
            const data = await PostLogin({ email: values.email, password: values.password })
            if(data['status']){
                setError(true)
                //console.log(data['message'])
            }
            else if(data['token']){
                //console.log(data['token'])
                if(data.checked){
                    Cookies.set('access_token', data['token'], { expires: 7 })
                }
                else{
                    Cookies.set('access_token', data['token'])
                }
                navigate('/')
            }
            else{
                //console.log(data)
            }
        }
      }

    return(
        <div>
            <TopBase page={"Login"}/>

            <AppForm>
           <form noValidate onSubmit={handleSubmit}>
               <Stack spacing={2}>
                    <TextField 
                        type="email"
                        label="Email"
                        autoComplete="email"
                        fullWidth
                        error={error}
                        value={values.email}
                        onChange={handleChange('email')}
                        required
                    />
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