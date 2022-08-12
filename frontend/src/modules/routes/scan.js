import { Grid, Fab } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useEffect, useRef, useCallback } from 'react'
import BottomNavigationBar from "../components/bottomNavigationBar"
import { QrReader } from 'react-qr-reader'
import useWindowDimensions from '../components/useWindowDimensions'
import { useNavigate } from 'react-router-dom'
import disableScroll from 'disable-scroll';
import CheckAuth from '../components/api/authorized'
//import QrReader from 'react-qr-scanner'

function Scan(){

    const navigate = useNavigate();

    let { height, width } = useWindowDimensions();
    let frame = (height < width) ? width: height;
    const qrRef = useRef(null);
    

    useEffect(() => {
        disableScroll.on()
        return function cleanup(){
            disableScroll.off()
        }
    })

    const handleResult = (result, error) => {
        if(!!result){
            console.log("QR SCANNED!", result?.text)
        }
        if(!!error){
            console.info(error)
        }
    }

    const handleScan = (data) => {
        if(data){
            if (data.startsWith('cypr:')){
                navigate(`/customer/:${data.replace('cypr:', '')}`)
            }
            //console.log(data)
        }
    }

    const onScanFile = () => {
        qrRef.current.openImageDialog();
    }

    const handleError = (error) => {
        console.log(error)
    }

    return(
        <div>
            <Grid
                container
                spacing={0}
                align="center"
                justify="center"
                direction="column"
                sx={{pb: 10}}
            >
                <Grid item>
                    <QrReader 
                        scanDelay={500}
                        onResult={handleResult}
                        style={{width: '100%', height: '100%'}}
                    />
                    
                </Grid>
            </Grid>
            <Fab  onClick={onScanFile} color="primary" sx=
            {{
                position: 'fixed',
                bottom: 86, 
                right: 16,
            }}>
                <Add  />
            </Fab>
            <BottomNavigationBar value={2}/>
        </div>
    )
}

export default Scan