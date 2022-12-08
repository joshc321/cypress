import { Box, Drawer, Divider, List, ListItem, ListItemIcon, 
        ListItemText, ListItemButton
} from '@mui/material'
import { Store, Assessment, Group, AddBusiness, TableChart } from '@mui/icons-material'
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../components/api/useAuth';

const drawerWidth = '15vw';

function Dashboard()
{
    // auth
    useAuth();

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
            <Outlet />
        </Box>
    )
}

export default Dashboard;

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