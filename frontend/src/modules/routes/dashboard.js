import { Box, Paper, Toolbar, Stack, Drawer, Divider, List, ListItem, ListItemIcon, 
        ListItemText, ListItemButton
} from '@mui/material'
import { Store, Assessment, Group, AddBusiness, TableChart } from '@mui/icons-material'
import AppForm from '../components/AppForm';
import MainButton from '../components/mainbutton';
import { useState } from 'react';
import SimpleTextField from '../components/formComponents/simpleTextField';
import TopBarLarge from '../components/topBarLarge'
import { Link } from 'react-router-dom';

const drawerWidth = '15vw';

function Dashboard()
{

    const [company, setCompany] = useState('')

    const handleChange = (e) => {
        setCompany(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(company)
        {
            console.log('creating company:', company)
        }
    }

    return(
        <Box sx={{ display: 'flex' }}>
            <Drawer
                
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                }}
                variant="permanent"
                anchor="left"
            >
                    <List>
                        <ListItem key={"Company"} disablePadding>
                            <ListItemButton component={Link} to={"/dashboard"}>
                                <ListItemIcon>
                                    <AddBusiness />
                                </ListItemIcon>
                                <ListItemText primary={"Company"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={"Process"} disablePadding>
                            <ListItemButton component={Link} to={"process"}>
                                <ListItemIcon>
                                    <TableChart />
                                </ListItemIcon>
                                <ListItemText primary={"Process"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {second.map(({label, icon}) => (
                            <ListItem key={label} disablePadding>
                                <ListItemButton component={Link} to={label.toLowerCase()}>
                                        <ListItemIcon>
                                            {icon}
                                        </ListItemIcon>
                                    <ListItemText primary={label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1 }}
            >
                <TopBarLarge primary={"Cypress"} secondary={"Create Company"}/>
                <AppForm top={1}>
                    <form noValidate onSubmit={handleSubmit}>
                        <Stack spacing={2} pt={2}>
                            <SimpleTextField label="Company Name" value={company} handleChange={handleChange}/>
                            <MainButton text={"Submit"} />
                        </Stack>
                    </form>
                </AppForm>
            </Box>
        </Box>
    )
}

export default Dashboard;

const initial = [
    {
        label: 'Company',
        icon: <AddBusiness />,
    },
    {
        label: 'Process',
        icon: <TableChart />,
    }
]

const second = [
    {
        label: 'Users',
        icon: <Group />,
    },
    {
        label: 'Companys',
        icon: <Store />,
    },
    {
        label: 'Metrics',
        icon: <Assessment />,
    }
]