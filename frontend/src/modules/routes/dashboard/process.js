import { useState, useRef } from 'react';
import { Box, Button, Typography, Collapse, Alert } from '@mui/material';
import AppForm from '../../components/AppForm';
import TopBarLarge from '../../components/topBarLarge';
import postCustomers from '../../components/api/postCustomers';
import { useNavigate } from 'react-router-dom';

function Process()
{

    // ref
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const [text, setText] = useState();
    const [alertOpen, setAlertOpen] = useState(false);

    // triggers when file is selected with click
    const handleChange = function(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            // handleFiles(e.target.files);
            if(e.target.files[0].size >  2 * 1024 * 1024)
            {
                console.error('File Must Be Less Than 2MB');
                setText('File Must Be Less Than 2MB.');
                return;
            }
            setText(e.target.files[0].name);
            // Upload File
            let formData = new FormData();
            formData.append('file',e.target.files[0]);
            postCustomers(formData)
                .then(rsp => {
                    const [body, status] = rsp;
                    switch(status)
                    {
                        case 200:
                            setAlertOpen(true);
                            break;
                        case 422:
                            setText('Invalid File Format');
                            break;
                        case 401:
                            navigate('/logout');
                            break;
                        default:
                            setText('Server Error')
                    }
                }).catch(e => console.error("server error"))
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    return(
        <Box
            component="main"
            sx={{ flexGrow: 1 }}
        >
            <TopBarLarge primary={"Cypress"} secondary={"Process Data"}/>
            <Collapse in={alertOpen}>
                <Alert variant="filled" severity="success" onClose={() => setAlertOpen(false)}>Successfully Uploaded!</Alert>
            </Collapse>
            <AppForm top={1}>
                <form noValidate onSubmit={(e) => e.preventDefault()}>
                    <input
                        ref={inputRef}
                        type="file"
                        onChange={handleChange}
                        hidden
                        accept='.json'
                    />
                    <Box 
                        display="flex"
                        justifyContent="center"
                        alignItems="center" 
                        flexDirection="column"
                        bgcolor="secondary.light"
                        sx={{ height: 200}}
                    >
                        <Typography>{text}</Typography>
                        <Button
                            variant="contained"
                            component="label"
                            onClick={onButtonClick}
                        >
                            Upload
                        </Button> 
                    </Box>
                </form>
            </AppForm>
        </Box>
    )
}

export default Process;