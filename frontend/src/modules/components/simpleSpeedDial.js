import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'

import { Link } from "react-router-dom";

function SimpleSpeedDial({actions})
{
    return(
        <SpeedDial
            ariaLabel='Simple Speed Dial'
            sx={{
                position: "fixed",
                bottom: 86,
                right: 16,
            }}
            icon={<SpeedDialIcon />}
        >
            {actions.map((action) => (
                <SpeedDialAction 
                    component={Link}
                    to={action.linkTo}
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}

                />
            ))}
        </SpeedDial>
    )
}

export default SimpleSpeedDial;