import BottomNavigationBar from '../components/bottomNavigationBar'
import TopBarLarge
 from '../components/topBarLarge';
function NotFound(){
    return(
        <div>
            <TopBarLarge primary="Cypress" secondary={"404 Page Not Found"}/>
            <BottomNavigationBar />
        </div>
    )
}

export default NotFound;
