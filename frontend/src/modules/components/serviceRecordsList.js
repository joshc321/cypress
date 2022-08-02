import { Box, ListItemButton, List, ListItem, ListItemText, Typography, Divider } from '@mui/material'
import { Event, Note, Notes, LocalAtm, ArrowForwardIos } from '@mui/icons-material';

import { Link } from 'react-router-dom';

import TextListItem from './textListItem';

function ServiceRecordsList({services})
{
    if (services && services.length > 0)
    {
        return(
            <Box sx={{pt: 0}}>
                <List>
                    {services.map((data, index) => (
                    <div key={index}>
                        <ListItem
                            secondaryAction={
                                <ArrowForwardIos />
                            }
                            disablePadding
                        >
                            <ListItemButton 
                                sx={{p: 0}} 
                                component={Link} 
                                to={`/logs/:${data._id}`}
                            >
                                <List>
                                    <TextListItem text={data.date.format()} icon={<Event />} />
                                    <TextListItem text={data.service} icon={<Note />} />
                                    <TextListItem text={data.notes} icon={<Notes />} />
                                    <TextListItem text={data.bill} icon={<LocalAtm />} />
                                </List>
                            </ListItemButton>
                        </ListItem>
                        <Divider sx={{pt: 1, borderBottomWidth: 2 }}/>
                    </div>
                    ))}
                </List>
            </Box>
        )
    }
    else{
        return('')
    }
}

export default ServiceRecordsList;