import { useState, useEffect, useRef  } from 'react';

import moment from "moment";
import { Stack, Box, Paper, Typography, Button, IconButton} from "@mui/material";
import Event from "./event";
import Overflow from "./overflow"

export default function Day({ value, selected, handleShowMore, day }) {
    const [height, setHeight] = useState(0);
    const [subHeight, setSubHeight] = useState(0);

    const [events, setEvent] = useState([...Array(parseInt(value) || 1).keys()]);

    const ref = useRef(null);
    const subRef = useRef(null);

    useEffect(() => {
        const resizeListener = () => {
            setHeight(ref.current.clientHeight);
            setSubHeight(subRef.current.clientHeight);
        }
        resizeListener();

        window.addEventListener('resize', resizeListener);
        return () => window.removeEventListener('resize', resizeListener);
    }, []);

    const handleShowOverflow = (event) => {
        event.stopPropagation();
        const data = {day: day, value: value, events: events};
        handleShowMore(data, event);
    }

    return(
        <Box
            flex={1}
            borderRight="1px solid"
            borderColor="secondary.light"
            overflow="hidden"
            ref={ref}
            onClick={(e) => console.log('big click', value)}
        >
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
                width="100%"
                spacing={0.5}
                pt={0.5}
            >
                <IconButton 
                    ref={subRef}
                    size="small"
                    sx={{
                        backgroundColor: selected ? 'secondary.light' : '',
                        padding: '2px',
                        minWidth: '20px',
                    }} 
                    onClick={() => console.log('click')}
                >
                    <Typography fontSize={12} >{value}</Typography>
                </IconButton>
                {events.map((v,idx) => {
                    if(ref && subRef && (idx+2)*subHeight < (height * 2/3) )
                    {
                        return(<Event key={v} value={value} />);
                    }
                    else if(ref && subRef && (idx+1)*subHeight < (height * 2/3))
                    {
                        return(<Overflow onClick={handleShowOverflow} key={v} value={"..."} />);
                    }
                    else{return}
                })}
            </Stack>
        </Box>
    )
}