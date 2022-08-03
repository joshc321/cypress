import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material'
import { Home,
    CropFree, AccountCircle, CalendarMonth, Event
 } from '@mui/icons-material';
 import { Link } from "react-router-dom";


function BottomNavigationBar(props){
    
    return(
        <Paper sx={{position: 'fixed' ,bottom: 0, left: 0, right: 0, height: 70, zIndex: 100,}} elevation={2}>
            <BottomNavigation
                showLabels
                value={props.value}
            >
            <BottomNavigationAction component={Link} to={'/'} label="HOME" icon={<Home />} />
            <BottomNavigationAction component={Link} to={'/calendar'} label="CALENDAR" icon={<CalendarMonth />} />
            <BottomNavigationAction component={Link} to={'/scan'}  label="SCAN" icon={<CropFree />} />
            <BottomNavigationAction component={Link} to={'/upcoming'} label="UPCOMING" icon={<Event />} />
            <BottomNavigationAction component={Link} to={'/account'}  label="ACCOUNT" icon={<AccountCircle />} />
            </BottomNavigation>
        </Paper>
    )
}

export default BottomNavigationBar;