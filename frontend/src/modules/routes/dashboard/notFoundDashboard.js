import { Box } from "@mui/material";
import TopBarLarge from "../../components/topBarLarge";

function NotFoundDashboard()
{
    return(
        <Box
            component="main"
            sx={{ flexGrow: 1 }}
        >
            <TopBarLarge primary={"Cypress"} secondary={"404 Page Not Found"}/>
        </Box>
    )
}

export default NotFoundDashboard;