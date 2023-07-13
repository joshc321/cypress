import moment from 'moment';

import { useEffect, useState } from 'react';
import { Box, Popover, Typography, Stack } from '@mui/material'
import Week from './week';
import Titles from './titles';
import getMonth from './getMonth';
import Popup from './popup';

function Month({ selectedDate }) {

    const [formatted, setFormatted] = useState(getMonth(selectedDate));

    const [popupData, setPopupData] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    
    useEffect(() => {
        setFormatted(getMonth(selectedDate))
    }, [selectedDate]);

    const handleShowMore = (data, event) => {
        setPopupData(data);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setPopupData(null);
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return(
        <Box
        display="flex"
        flexDirection="column"
        height='100%'
        >
            <Titles />
            <Box display="flex" flexDirection="column" flex={1}>
                {formatted.map((val,idx) => {
                return(<Week key={idx} values={val} handleShowMore={handleShowMore}/>)
                })}
            </Box>
        
            <Popup 
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                data={popupData}
            />

        </Box>
    )
}

export default Month;