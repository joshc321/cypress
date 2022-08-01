import { useState } from "react";

import TopBar from "../components/topBar";
import SimpleScheduledServiceView from "../components/simpleScheduledServiceView";
import BottomNavigationBar from "../components/bottomNavigationBar";

import moment from "moment";
import { useParams } from 'react-router-dom'

function ViewScheduledService()
{
    const [error, setError] = useState(false)
    const [data, setData] = useState(dataExample)
    let { slug } = useParams();

    return(
        <div>
            <TopBar primary="Scheduled Service" secondary={!error ? "Information" : "Service Not Found"}/>
            <SimpleScheduledServiceView data={data} />
            <BottomNavigationBar />
        </div>
    )
}

export default ViewScheduledService;

const dataExample = 
{
    date: moment(),
    service: 'did some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsthingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsthingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsthingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsthingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsthingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some thingsdid some things',
    notes: 'they were there',
    estimate: '32.32',
    customer: 
    {
      _id: 'a9s8df70a9d',
      first: 'Coral',
      last: 'Raymond',
      address: '1123 S State Street Hemet CA'
    }
}