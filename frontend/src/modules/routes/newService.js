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
import SimpleFormTopper from '../components/simpleFormTopper';
import AddressField from '../components/formComponents/addressField';
import DateField from '../components/formComponents/dateField';
import PriceField from '../components/formComponents/priceField';
import MultiBaseField from '../components/formComponents/multiBaseField';

import moment from 'moment';
import SimpleTopBar from '../components/simpleTopBar';
import TextBaseField from '../components/formComponents/textBaseField';

function NewService() {

    const navigate = useNavigate();

    let { slug } = useParams(); 
    slug = slug.substring(1);

    const [checked, setChecked] = useState(true);

    const [values, setValues] = useState(serviceRecordExample);
    
      const handleCheck = (e) => {
          setChecked(!checked)
      }
      const handleEmbededChange = (prop1) => (prop2) => (event) => {
        setValues({ ...values, [prop1]:{ ...values[prop1], [prop2]: event.target.value } });
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
            <SimpleTopBar to={-1} text={"New Service Record"} />
            
            <AppForm top={1}>

                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <SimpleFormTopper text="Info" label="Default" checked={checked} setChecked={handleCheck} />
                        <DateField value={values.date} handleChange={handleChange('date')} required={false} />

                        {!checked ? 
                            <AddressField address={values.address} handleChange={handleEmbededChange('address')} required={false} />
                        : ''}
                        
                        <MultiBaseField label={"Service"} value={values.service} handleChange={handleChange('service')} />
                        <MultiBaseField label={"Notes"} value={values.notes} handleChange={handleChange('notes')} />
                        <TextBaseField label="Notes" value={values.notes} handleChange={handleChange('notes')}/>
                        <PriceField value={values.bill} handleChange={handleChange('bill')} label="Bill"/>
                        <MainButton text={"Create"} />
                    </Stack>
                </form>
            </AppForm>
            <BottomNavigationBar />
        </Box>
    )
}

export default NewService


const serviceRecordExample = {
    date: moment(),
    address: {
        street: 'test',
        city: 'uhhh',
        state: 'CA',
        zip: 'idk'
    },
    service: 'some things',
    notes: 'ds;flaksd',
    bill: '43',
    cost: '23',
}