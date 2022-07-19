import { Button } from '@mui/material';

function MainButton(props){
    return(
        <div>
            <Button 
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                style={{
                    height: '60px'
                }}
                sx={{
                    backgroundColor: 'secondary.dark',
                    fontWeight:"fontWeightSemiBold",
                    fontSize: 16,
                }}
            >
                {props.text}
            </Button>
        </div>
    )
} 

export default MainButton;