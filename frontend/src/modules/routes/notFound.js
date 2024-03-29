import BottomNavigationBar from '../components/bottomNavigationBar'
import TopBarLarge from '../components/topBarLarge';
import useAuth from '../components/api/useAuth';

function NotFound(){

    useAuth();
    
    return(
        <div>
            <TopBarLarge primary="Cypress" secondary={"404 Page Not Found"}/>
            <BottomNavigationBar />
        </div>
    )
}

export default NotFound;
