import { useState } from "react"
import { Box, Stack, Typography } from "@mui/material"

import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import useQuery from "../components/hooks/useQuery";

import SimpleTopBar from "../components/simpleTopBar"
import BottomNavigationBar from "../components/bottomNavigationBar"
import AppForm from "../components/AppForm"
import MainButton from "../components/mainbutton"
import DateField from "../components/formComponents/dateField";
import MultiBaseField from "../components/formComponents/multiBaseField";
import PriceField from "../components/formComponents/priceField";
import CustomerSelectorField from "../components/formComponents/customerSelectorField";
import SimpleFormTopper from "../components/simpleFormTopper";
import postScheduledService from "../components/api/postScheduledService";
import useAuth from "../components/api/useAuth";
import GetCustomer from "../components/api/getCustomer";

function ScheduleService()
{
    useAuth();
    const navigate = useNavigate();
    const query = useQuery();

    const [custID, setCustId] = useState(query.get('custid'));
    const [customer, loading] = GetCustomer(custID);
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
            postScheduledService(values)
            .then(rsp => {
                const [body, status] = rsp;
                switch(status)
                {
                    case 200:
                        navigate(`/viewscheduledservice/${body._id}`);
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
    }


    return(
        <div>
            <Box sx={{ pb: 10 }}>
                <SimpleTopBar to={-1} text={"Schedule Service"}/>
            <AppForm top={1}>
                <form noValidate onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <SimpleFormTopper text="Info" />
                            <CustomerSelectorField value={!loading && customer.first ? customer.first + ' ' + customer.last : ''} error={error} />
                            <DateField value={values.date} handleChange={handleChange('date')} error={error} required/>
                            <MultiBaseField label="Service" value={values.service} handleChange={handleChange('service')} />
                            <PriceField  value={values.estimate} handleChange={handleChange('estimate')} />
                            <MultiBaseField label="Notes" value={values.notes} handleChange={handleChange('notes')} />
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