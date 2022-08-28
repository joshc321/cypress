import ListItemThreeIn from "./listItemThreeIn";
import { List } from "@mui/material";
import formatAddress from "./helpers/formatAddress";
import formatDate from "./helpers/formatDate"

// change key to data._id when connecting to backed

function ScheduledServiceList({services})
{
    return(
        <List>
            {services.map((data) => (
                <ListItemThreeIn key={data._id} primaryText={`${data?.customer?.first} ${data?.customer?.last}`} secondaryText={formatDate(data.date, true)} topText={formatAddress(data?.customer?.address)} linkTo={`/viewscheduledservice/${data?._id}`}/>
            ))}
        </List>
    );
}

export default ScheduledServiceList;