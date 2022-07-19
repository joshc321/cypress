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
import CheckAuth from '../components/api/authorized';

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
        notes: '',
      });
      
      const authed = useCallback(async() =>{
        const auth = await CheckAuth()
        if(auth === false){
            navigate('/login')
        }
        else{
        }
    }, [navigate])
    
    useEffect(() => {
        authed()
    }, [authed])

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };


      const handleSubmit = async e => {
        e.preventDefault()
        setError(false)
        
        if(values.last === '' || values.first === '' || values.phone === '' || values.address === ''){
            setError(true)
        }

        if(values.last && values.first && values.phone && values.address){
            const data = await PostCustomer(values)
            //console.log(values, data['id']);
            navigate(`/customer/:${data['id']}`)
        }
      }

    return(
        <Box sx={{ pb: 10 }}>
            <Box sx={{ml: 0, mt:0}}>
                <IconButton
                    aria-label="back button"
                    onClick={()=>navigate(-1)}
                    edge="end"
                    >
                    {<ArrowBackIosNew/>}
                </IconButton>
            </Box>
            <Box sx={{ml: 2, mt: 2}}>
                <Typography fontWeight="fontWeightBold" variant="h4">Create Customer</Typography>
            </Box>
            <AppForm top={1}>

                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <Box sx={{ mt: 2}}>
                            <Typography fontWeight="fontWeightSemibold" variant="h6">Info</Typography>
                        </Box>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <TextField 
                                label="First name"
                                autoComplete="given-name"
                                sx={{width: "49%"}}
                                error={error}
                                value={values.first}
                                onChange={handleChange('first')}
                                required
                            />
                            <TextField 
                                label="Last name"
                                autoComplete="family-name"
                                sx={{width: "49%"}}
                                error={error}
                                value={values.last}
                                onChange={handleChange('last')}
                                required
                            />
                        </Grid>
                        <TextField 
                            type="phone"
                            label="Phone"
                            autoComplete="tel-national"
                            fullWidth
                            error={error}
                            value={values.phone}
                            onChange={handleChange('phone')}
                            required
                        />
                        <TextField 
                            autoComplete="street-address"
                            label="Address"
                            fullWidth
                            error={error}
                            required
                            value={values.address}
                            onChange={handleChange('address')}
                        />
                        <TextField 
                            label="City"
                            autoComplete="address-level2"
                            fullWidth
                            value={values.city}
                            onChange={handleChange('city')}
                        />
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <TextField 
                                label="State"
                                autoComplete="address-level1"
                                sx={{width: "49%"}}
                                value={values.state}
                                onChange={handleChange('state')}
                            />
                            <TextField 
                                label="Zip"
                                autoComplete="postal-code"
                                sx={{width: "49%"}}
                                value={values.zip}
                                onChange={handleChange('zip')}
                            />
                        </Grid>
                        <TextField 
                            label="System"
                            fullWidth
                            value={values.system}
                            onChange={handleChange('system')}
                        />
                        <TextField 
                            label="Notes"
                            fullWidth
                            value={values.notes}
                            onChange={handleChange('notes')}
                        />
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