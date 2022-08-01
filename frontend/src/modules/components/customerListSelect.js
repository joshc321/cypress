import { List } from "@mui/material";
import ListItemThreeIn from "./listItemThreeIn";


// change key to data._id when connecting to backed

function CustomerListSelect({customers, linkTo})
{
    return(
        <List>
            {customers.map((data, index) => (
                <ListItemThreeIn 
                    key={index} 
                    primaryText={`${data.first} ${data.last}`} 
                    secondaryText={`${data.address.city}, ${data.address.state}`} 
                    topText={data.phone} 
                    linkTo={`${linkTo}${data._id}`}
                />
            ))}
        </List>
    )
}

export default CustomerListSelect;