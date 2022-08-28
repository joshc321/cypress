import BottomNavigationBar from '../components/bottomNavigationBar'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import TopBar from '../components/topBar'
import moment from 'moment'
import SimpleServiceView from '../components/simpleServiceView'
import useAuth from '../components/api/useAuth'
import GetServiceRecord from '../components/api/getServiceRecord'

function ServiceRecord(){
    useAuth();
    let { slug } = useParams(); 

    const [service, loading] = GetServiceRecord(slug);

    const [error, setError] = useState(false)

    return(
        <div>
            <TopBar primary="Service Record" secondary={service?._id ? "Information" : "Service Not Found"}/>         
            {!loading && <SimpleServiceView data={service} />}
            <BottomNavigationBar />
        </div>
    )
}

export default ServiceRecord;