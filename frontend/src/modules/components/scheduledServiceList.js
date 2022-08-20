import ListItemThreeIn from "./listItemThreeIn";
import { List } from "@mui/material";
import moment from "moment";

// change key to data._id when connecting to backed

function ScheduledServiceList({services})
{
    return(
        <List>
            {services.map((data, index) => (
                <ListItemThreeIn key={index} primaryText={`${data?.customer?.first} ${data?.customer?.last}`} secondaryText={moment(data.date).format()} topText={data?.customer?.address} linkTo={`/viewscheduledservice/${data?._id}`}/>
            ))}
        </List>
    );
}

export default ScheduledServiceList;