import { Box } from '@mui/material'
import Day from './day';

function Week({ values, handleShowMore }) {
    return(
        <Box 
          overflow="hidden" 
          display="flex" 
          flex={1} 
          width="100%" 
          borderBottom="1px solid"
          borderLeft="1px solid"
          borderColor="secondary.light"
          boxSizing="border-box"
        >
          {values.map((val) => {
            return(
                <Day key={val[0]} value={val[0]} selected={val[1]} day={val[2]} handleShowMore={handleShowMore} />
            )
          })}
        </Box>
    )
}

export default Week;