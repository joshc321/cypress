import { useEffect } from "react";
import { List } from "@mui/material";
import ListItemThreeIn from "./listItemThreeIn";
import formatAddress from "./helpers/formatAddress";

// change key to data._id when connecting to backed

function CustomerListSelect({customers, linkTo})
{

    return(
        <List>
            {customers.map((data) => (
                <ListItemThreeIn 
                    key={data._id} 
                    primaryText={`${data.first} ${data.last}`} 
                    secondaryText={formatAddress(data?.address)} 
                    topText={data.phone} 
                    linkTo={`${linkTo}${data._id}`}
                />
            ))}
        </List>
    )
}

export default CustomerListSelect;