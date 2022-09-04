import { useEffect, useState } from "react"
import { Box, Stack, Typography, TextField, InputAdornment, Input } from "@mui/material"
import { ArrowForwardIos } from "@mui/icons-material";

import moment from 'moment';
import { useNavigate, Link, useParams } from 'react-router-dom';

import useQuery from "../components/hooks/useQuery";

import SimpleTopBar from "../components/simpleTopBar"
import BottomNavigationBar from "../components/bottomNavigationBar"
import AppForm from "../components/AppForm"
import MainButton from "../components/mainbutton"
import DateField from "../components/formComponents/dateField";
import TextBaseField from "../components/formComponents/textBaseField";
import MultiBaseField from "../components/formComponents/multiBaseField";
import PriceField from "../components/formComponents/priceField";
import SimpleFormTopper from "../components/simpleFormTopper";
import useAuth from "../components/api/useAuth";
import GetScheduledService from "../components/api/getScheduledService";
import putScheduled from "../components/api/putScheduled";

function EditScheduled()
{
    useAuth();
    const navigate = useNavigate();
    const { slug } = useParams();

    const [data, loading] = GetScheduledService(slug)

    const [error, setError] = useState(false)
    const [values, setValues] = useState(empyScheduled);

    useEffect(() => {

        if(!loading)
        {
            setValues({...values, ...data})
        }

    }, [loading])
    
    const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(false)
        if(values.customer && values.date)
        {
            putScheduled(values, slug)
            .then(rsp => {
                const [body, status] = rsp;
                switch(status)
                {
                    case 200:
                        navigate(-1);
                        break;
                    case 422:
                        setError(true);
                        console.log(rsp)
                        break;
                    case 401:
                        navigate('/logout');
                        break;
                    default:
                        setError(true);
                        console.error(body)
                }
              }).catch(e => console.log("server error"))
        }
        else setError(true)
    }


    return(
        <div>
            <Box sx={{ pb: 10 }}>
                <SimpleTopBar to={-1} text={"Edit Scheduled"}/>
            <AppForm top={1}>
                <form noValidate onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <SimpleFormTopper text="Info" />
                            <TextBaseField label="Customer" value={values?.customer?.first + " " + values?.customer?.last} handleChange={() => {}} disabled={true}/>
                            <DateField value={values.date} handleChange={handleChange('date')} error={error} required/>
                            <MultiBaseField label="Service" value={values.service} handleChange={handleChange('service')} />
                            <PriceField  value={values.estimate} handleChange={handleChange('estimate')} />
                            <MultiBaseField label="Notes" value={values.notes} handleChange={handleChange('notes')} />
                            {error ? <Typography variant="body2" color="error" >Please input required fields</Typography> : ""}
                            <MainButton text={"Update"} />
                        </Stack>
                    </form>
                </AppForm>
            </Box>
            <BottomNavigationBar />
        </div>
    )
}

export default EditScheduled;

const empyScheduled = {
    customer: {
        first: '',
        last: '',
    },
    date: moment(),
    service: '',
    estimate: '',
    notes: '',
}