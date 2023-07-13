import { Box, Typography, Divider } from '@mui/material';
import ScheduledServiceList from '../../scheduledServiceList';

function Day({ selectedDate }) {
    return(
        <Box
            flex={1}
            display='flex'
            flexDirection='column'
            sx={{overflowY: 'scroll'}}
        >
            <Box py={1} backgroundColor='primary.dark'>
                <Typography 
                    align={'center'}
                    fontFamily='Proxima Nova'
                    fontWeight='fontWeightSemiBold'
                    color={'primary.contrastText'}
                >
                    {selectedDate.format("dddd D")}
                </Typography>
            </Box>
            <Box
                sx={{overflowY: 'scroll'}}
            >
                <ScheduledServiceList services={services}/>
            </Box>
        </Box>
    )
}

export default Day;

const services = [
    {
        _id: '1234123',
        date: new Date,
        customer: {
            first: 'john',
            last: 'doe',
            address: {
                city: 'hemet',
                state: 'CA',
                zip: '92543',
                street: '1123 S. State street'
            }
        }
    },
    {
        _id: '01928374',
        date: new Date,
        customer: {
            first: 'john',
            last: 'doe',
            address: {
                city: 'hemet',
                state: 'CA',
                zip: '92543',
                street: '1123 S. State street'
            }
        }
    },
    {
        _id: '198435',
        date: new Date,
        customer: {
            first: 'john',
            last: 'doe',
            address: {
                city: 'hemet',
                state: 'CA',
                zip: '92543',
                street: '1123 S. State street'
            }
        }
    },
    {
        _id: '0192384',
        date: new Date,
        customer: {
            first: 'john',
            last: 'doe',
            address: {
                city: 'hemet',
                state: 'CA',
                zip: '92543',
                street: '1123 S. State street'
            }
        }
    },
]