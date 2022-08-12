import { TextField } from "@mui/material"
import moment from "moment"

export default function DateField({value, handleChange, error, required=true})
{
    return(
        <TextField 
            type="datetime-local"
            label="Date"
            fullWidth
            error={error}
            value={moment(value).format("YYYY-MM-DDTHH:mm")}
            onChange={handleChange}
            required={required}
            InputLabelProps={{
                shrink: true,
                }}
        />
    )
}