import { useState } from "react"
import { Box, Stack, Typography, TextField, InputAdornment, Input } from "@mui/material"
import { ArrowForwardIos } from "@mui/icons-material";

import moment from 'moment';
import { useNavigate, Link } from 'react-router-dom';

import useQuery from "../components/hooks/useQuery";

import SimpleTopBar from "../components/simpleTopBar"
import BottomNavigationBar from "../components/bottomNavigationBar"
import AppForm from "../components/AppForm"
import MainButton from "../components/mainbutton"

function ScheduleService()
{
    const navigate = useNavigate();
    const query = useQuery();

    const [custID, setCustId] = useState(query.get('custid'))
    const [error, setError] = useState(false)
    const [values, setValues] = useState({
        customer: custID != null ? custID : '',
        date: moment(),
        service: '',
        estimate: '',
        notes: '',
      });
    
    const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(false)
        if(values.customer === '' || values.date === null || values.date === '')
        {
            setError(true)
        }
        else
        {
            navigate('/calendar')
        }
    }


    return(
        <div>
            <Box sx={{ pb: 10 }}>
                <SimpleTopBar to={'/calendar'} text={"Schedule Service"}/>
            <AppForm top={1}>
                <form noValidate onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <Box sx={{ mt: 2}}>
                                <Typography fontWeight="fontWeightSemibold" variant="h6">Info</Typography>
                            </Box>
                            <TextField 
                                style={{ textDecoration: 'none' }}
                                sx={{
                                    '&:hover': {
                                        opacity: [0.7,0.8,0.8],
                                      },
                                }}
                                disabled
                                component={Link}
                                to={'/selectcustomer'}
                                label="Customer"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <ArrowForwardIos fontSize="small" />
                                      </InputAdornment>  
                                    ),
                                }}
                                error={error}
                                value={values.customer}
                                required
                            />
                            <TextField 
                                type="datetime-local"
                                label="Date"
                                fullWidth
                                error={error}
                                value={moment(values.date).format("YYYY-MM-DDTHH:mm")}
                                onChange={handleChange('date')}
                                required
                            />
                            <TextField 
                                label="Service"
                                fullWidth
                                value={values.service}
                                onChange={handleChange('service')}
                            />
                            <TextField 
                                type="number"
                                label="Estimate"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        $
                                      </InputAdornment>  
                                    ),
                                }}
                                value={values.estimate}
                                onChange={handleChange('estimate')}
                            />
                            <TextField 
                                label="Notes"
                                fullWidth
                                multiline
                                value={values.notes}
                                onChange={handleChange('notes')}
                            />
                            {error ? <Typography variant="body2" color="error" >Please input required fields</Typography> : ""}
                            <MainButton text={"Create"} />
                        </Stack>
                    </form>
                </AppForm>
            </Box>
            <BottomNavigationBar />
        </div>
    )
}

export default ScheduleService