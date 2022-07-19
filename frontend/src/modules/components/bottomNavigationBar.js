import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material'
import { Home,
    CropFree, AccountCircle
 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'


function BottomNavigationBar(props){
    const navigate = useNavigate();
    return(
        <Paper sx={{position: 'fixed' ,bottom: 0, left: 0, right: 0, height: 70, zIndex: 'tooltip',}} elevation={2}>
            <BottomNavigation
                showLabels
                value={props.value}
            >
            <BottomNavigationAction onClick={()=>navigate('/')} label="HOME" icon={<Home />} />
            <BottomNavigationAction onClick={()=>navigate('/scan')}  label="SCAN" icon={<CropFree />} />
            <BottomNavigationAction onClick={()=>navigate('/account')} label="ACCOUNT" icon={<AccountCircle />} />
            </BottomNavigation>
        </Paper>
    )
}

export default BottomNavigationBar;