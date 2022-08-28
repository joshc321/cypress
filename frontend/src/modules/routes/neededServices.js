import TopBar from "../components/topBar";
import StragglerList from "../components/stragglerList";
import BottomNavigationBar from "../components/bottomNavigationBar";
import useAuth from '../components/api/useAuth';
import GetUpcoming from "../components/api/getUpcoming";


function NeededServices()
{
    useAuth();
    
    const [stragglers, loading] = GetUpcoming();

    return(
        <>
            <TopBar primary="Upcoming" secondary={"Customers"}/>
            {!loading && <StragglerList customers={stragglers} />}
            <BottomNavigationBar value={3} />
        </>
    )
}

export default NeededServices;