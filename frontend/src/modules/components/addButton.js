import { Fab } from '@mui/material'
import { Add } from '@mui/icons-material'
import { Link } from "react-router-dom";

function AddButton({linkTo})
{
    return(
        <Fab
        component={Link}
        to={linkTo}
        color="primary"
        sx={{
          position: "fixed",
          bottom: 86,
          right: 16,
        }}
      >
        <Add />
      </Fab>
    )
}

export default AddButton;