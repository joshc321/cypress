import ListItemThreeIn from "./listItemThreeIn";

// change key to data._id when connecting to backed

function ScheduledServiceList({services})
{
    return(
        <>
            {services.map((data, index) => (
                <ListItemThreeIn key={index} primaryText={`${data.customer.first} ${data.customer.last}`} secondaryText={data.date.format()} topText={data.customer.address} linkTo={'/test'}/>
            ))}
        </>
    );
}

export default ScheduledServiceList;