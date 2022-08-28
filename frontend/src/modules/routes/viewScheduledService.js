import TopBar from "../components/topBar";
import SimpleScheduledServiceView from "../components/simpleScheduledServiceView";
import BottomNavigationBar from "../components/bottomNavigationBar";

import { useParams } from 'react-router-dom'
import useAuth from '../components/api/useAuth'
import GetScheduledService from "../components/api/getScheduledService";

function ViewScheduledService()
{
    useAuth();
    let { slug } = useParams();
    const [data, loading] = GetScheduledService(slug)

    return(
        <div>
            <TopBar primary="Scheduled Service" secondary={data._id ? "Information" : "Service Not Found"}/>
            {!loading && <SimpleScheduledServiceView data={data} />}
            <BottomNavigationBar />
        </div>
    )
}

export default ViewScheduledService;
