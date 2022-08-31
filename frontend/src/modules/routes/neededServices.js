import TopBar from "../components/topBar";
import StragglerList from "../components/stragglerList";
import BottomNavigationBar from "../components/bottomNavigationBar";
import useAuth from '../components/api/useAuth';
import GetUpcoming from "../components/api/getUpcoming";
import TopBarDateSelector from "../components/topBarDateSelector";
import { useEffect, useState } from "react";
import moment from "moment";


function NeededServices()
{
    useAuth();
    
    const [selectedDate, setSelectedDate] = useState(moment())
    const [stragglers, loading] = GetUpcoming(selectedDate);

    const handleChange = (event) => {
        const date = moment(event.target.value, "yyyy-MM", true)
        if(date.isValid())  setSelectedDate(moment(event.target.value))
        else console.error('invalid date')
    }

    return(
        <>
            <TopBarDateSelector primary="Upcoming" secondary="Customers" date={selectedDate} handleChange={handleChange}/>
            {!loading && <StragglerList customers={stragglers} />}
            <BottomNavigationBar value={3} />
        </>
    )
}

export default NeededServices;