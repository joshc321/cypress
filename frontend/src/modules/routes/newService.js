import { IconButton, Box, Typography,
    Stack, TextField, Grid, FormControlLabel,
    Checkbox
} from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import MainButton from '../components/mainbutton';
import BottomNavigationBar from '../components/bottomNavigationBar';
import { useState, useEffect, useCallback } from 'react'
import AppForm from '../components/AppForm';
import { useNavigate, useParams } from 'react-router-dom';
import PostService from '../components/api/postService'
import CheckAuth from '../components/api/authorized';
import ConvertDate from '../components/helpers/convertDate';

function NewService() {

    const navigate = useNavigate();

    let { slug } = useParams(); 
    slug = slug.substring(1);

    const [checked, setChecked] = useState(true);

    const authed = useCallback(async() =>{
        const auth = await CheckAuth()
        if(auth === false){
            navigate('/login')
        }
        else{
        }
    },[navigate])
    
    useEffect(() => {
        authed()
    }, [authed])

    const [values, setValues] = useState({
        date: Date.now(), 
        address: '',
        city: '',
        state: '',
        zip: '',
        service: '',
        notes: '',
        bill: '',
        price: '',
      });
    
      const handleCheck = (e) => {
          setChecked(!checked)
      }

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

      const handleDate = (prop) => (event) => {
          let value = Date.parse(event.target.value)
        setValues({ ...values, [prop]: value });
      };

      const handleSubmit = async e => {
        e.preventDefault()
        const data = {
            date: new Date(values.date).toISOString(),
            address: values.address,
            city: values.city,
            state: values.state,
            zip: values.zip,
            service: values.service,
            notes: values.notes,
            bill: values.bill,
            price: values.price,
        }
        //console.log(values.date)
        //console.log(data.date)
        await PostService(data, slug)
        //console.log(result);
        navigate(-1);
        //navigate(`/services/s?id=${data['id']}`)
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
                <Typography fontWeight="fontWeightBold" variant="h4">New Service Record</Typography>
            </Box>
            
            <AppForm top={1}>

                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <Box sx={{ pt: 0 }}>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ml: 2, mt: 1, pr: 4}}>
                                <Grid >
                                <Typography fontWeight="fontWeightSemibold" variant="h6">Info</Typography>
                                </Grid>
                                <Grid >
                                <FormControlLabel labelPlacement="start" control={
                                    <Checkbox 
                                        checked={checked}
                                        onChange={handleCheck}
                                        color="primary"
                                    />
                                } label={<Typography fontWeight="fontWeightThin" variant="body2">Default</Typography>} />                            </Grid>
                            </Grid> 
                        </Box>
                            <TextField 
                                id="datetime"
                                type="datetime-local"
                                label="Date Time"
                                value={ConvertDate(values.date)}
                                fullWidth
                                onChange={handleDate('date')}
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                              />
                        
                        {!checked ? 
                        <Stack spacing={2}>
                        <TextField 
                            autoComplete="street-address"
                            label="Address"
                            fullWidth
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
                        </Stack>
                        : ''}
                        <TextField 
                            label="Service"
                            fullWidth
                            value={values.service}
                            onChange={handleChange('service')}
                        />
                        <TextField 
                            label="Notes"
                            fullWidth
                            value={values.notes}
                            onChange={handleChange('notes')}
                        />
                        <TextField 
                            label="Bill"
                            type="number"
                            fullWidth
                            value={values.price}
                            onChange={handleChange('price')}
                        />
                        <MainButton text={"Create"} />
                    </Stack>
                </form>
            </AppForm>
            <BottomNavigationBar />
        </Box>
    )
}

export default NewService