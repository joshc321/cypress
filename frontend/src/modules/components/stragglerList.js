import ListItemThreeIn from "./listItemThreeIn";
import { List, Box } from "@mui/material";
import formatDate from "./helpers/formatDate";

// change key to data._id when connecting to backed

function StragglerList({customers})
{
    return(
        <Box sx={{pt: 25, pb: 8}}>
            {Array.isArray(customers) ?
            <List>
                {customers.map((data) => (
                    <ListItemThreeIn key={data._id} primaryText={`${data.first} ${data.last}`} secondaryText={formatDate(data.nextService)} topText={data.phone} linkTo={`/customer/${data._id}`}/>
                ))}
            </List> : ''}
        </Box>
    )
}

export default StragglerList;