import ListItemThreeIn from "./listItemThreeIn";
import { List, Box } from "@mui/material";

// change key to data._id when connecting to backed

function StragglerList({test})
{
    return(
        <Box sx={{pt: 25, pb: 8}}>
            <List>
                {test.map((data, index) => (
                    <ListItemThreeIn key={index} primaryText={`${data.first} ${data.last}`} secondaryText={data.nextService.format()} topText={data.phone} linkTo={`/customer/${data._id}`}/>
                ))}
            </List>
        </Box>
    )
}

export default StragglerList;