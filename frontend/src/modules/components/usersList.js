import ListItemThreeIn from "./listItemThreeIn";
import { List, Box } from "@mui/material";

// change key to data._id when connecting to backed

function UsersList({users})
{
    return(
        <Box sx={{ pt: 25, pb: 8 }}>
            <List>
                {users.map((data, index) => (
                    <ListItemThreeIn key={index} primaryText={`${data.first} ${data.last}`} secondaryText={data.email} topText={permissions[data.permissionLevel]} linkTo={`/user/${data._id}`}/>
                ))}
            </List>
        </Box>
    );
}

export default UsersList;

const permissions = {
    0: 'Viewer',
    1: 'Editor',
    2: 'Admin'
}