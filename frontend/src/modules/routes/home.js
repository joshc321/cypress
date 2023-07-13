import { useSearchParams } from 'react-router-dom'

import AddButton from '../components/addButton'
import SearchBar from "../components/searchBar";
import CustomerListScroll from '../components/customerListScroll';
import BottomNavigationBar from '../components/bottomNavigationBar';
import useAuth from '../components/api/useAuth';

function Home() 
{
  useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const setSearch = (val,filter) => {
    const currentParams = Object.fromEntries([...searchParams]);
    if(val)
    {
      currentParams['q'] = val;
    }
    else if('q' in currentParams)
    {
      delete currentParams['q']
    }
    if(filter)
    {
      currentParams['f'] = filter;
    }
    else if('f' in currentParams)
    {
      delete currentParams['f']
    }
    setSearchParams(currentParams);
  }

  return (
    <div>
      <SearchBar setSearchVal={setSearch} placeholder={searchParams.get('q') || ''} placeholderFilter={searchParams.get('f') || ''}/>
      <CustomerListScroll searchVal={searchParams.get('q') || ''} filterVal={searchParams.get('f') || ''} linkTo={'/customer/'} />
      <AddButton linkTo={'/create-customer'} />
      <BottomNavigationBar value={0} />
    </div>
  );
}

export default Home;
