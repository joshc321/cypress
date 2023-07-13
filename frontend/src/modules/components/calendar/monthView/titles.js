import { Box, Typography } from "@mui/material";
import moment from "moment";

function Titles() {
    return(
      <Box 
          overflow="hidden" 
          display="flex" 
          width="100%" 
          borderLeft="1px solid"
          borderTop="1px solid"
          borderColor="secondary.light"
          boxSizing="border-box"
        >
          {moment.weekdaysShort().map((val) => {
            return(
              <Box
                flex={1}
                borderRight="1px solid"
                borderColor="secondary.light"
                overflow="hidden"
                key={val}
              >
                <Typography textTransform={"uppercase"} fontSize={12} fontWeight="fontWeightRegular" align="center" >{val}</Typography>
              </Box>
            )
          })}
        </Box>
    )
}

export default Titles;