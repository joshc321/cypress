import { useEffect, useRef, useCallback } from 'react'
import BottomNavigationBar from "../components/bottomNavigationBar"
import useWindowDimensions from '../components/useWindowDimensions'
import { useNavigate } from 'react-router-dom'
import disableScroll from 'disable-scroll';
import CheckAuth from '../components/api/authorized'
import QrScanner from 'qr-scanner'
import { RemoveScrollBar } from 'react-remove-scroll-bar'
import AddButton from '../components/addButton'

function Scan(){

    const navigate = useNavigate();

    let { height, width } = useWindowDimensions();
    const qrRef = useRef(null);
    const file = useRef(null);

    function scanRegion(video) {
        const smallestDimension = Math.min(height, width);
        const scanRegionSize = Math.round((1 / 3) * smallestDimension);
        const _legacyCanvasSize = 400;
        return {
            x: Math.round((video.videoWidth - scanRegionSize) / 2),
            y: Math.round((video.videoHeight - scanRegionSize) / 2),
            width: scanRegionSize,
            height: scanRegionSize,
            downScaledWidth: _legacyCanvasSize,
            downScaledHeight: _legacyCanvasSize,
        };
    }
    const handleScan = (data) => {
        if(data){
            if (data.startsWith('cypr:')){
                navigate(`/customer/${data.replace('cypr:', '')}`)
            }
        }
    }

    const scanFile = () => {
        file.current.click();
    }

    useEffect(() => {
        const qrScanner = new QrScanner(
            qrRef.current,
            result => handleScan(result.data),
            {
                highlightScanRegion: true,
                calculateScanRegion: scanRegion,
              }
        );
        qrScanner.start()
        
        const scanFileQr = event => {
            const selected = file.current.files[0];
            if(!file)
            {
                return
            }
            QrScanner.scanImage(selected, {returnDetailedScanResult: true})
                .then(result => handleScan(result.data))
                .catch(e => console.log({data: e || 'No QR code found'}))
        };

        file.current.addEventListener('change', scanFileQr)

        return function cleanup(){
            qrScanner.stop();
            qrScanner.destroy();
        }
    }, [])

    return(
        <div>
            <div className='video-container' >
                <RemoveScrollBar /> 
                <video 
                    style={{
                        width: width,
                        height: height,
                        objectFit: 'cover',
                    }}
                    ref={qrRef}
                >
                </video>
            </div>
            <input type='file' id='file' ref={file} style={{display: 'none'}}/>
            <AddButton onClick={scanFile} />
            <BottomNavigationBar value={2} />
        </div>
    )
}

export default Scan;