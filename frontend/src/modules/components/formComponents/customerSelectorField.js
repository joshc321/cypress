import { TextField, InputAdornment } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function CustomerSelectorField({value, error, required=true})
{
    return(
        <TextField 
            style={{ textDecoration: 'none' }}
            sx={{
                '&:hover': {
                    opacity: [0.7,0.8,0.8],
                    },
            }}
            disabled
            component={Link}
            to={'/selectcustomer'}
            label="Customer"
            fullWidth
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <ArrowForwardIos fontSize="small" />
                    </InputAdornment>  
                ),
            }}
            error={error}
            value={value}
            required={required}
        />
    )
}