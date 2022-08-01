import { useState } from 'react'

import AddButton from '../components/addButton'
import SearchBar from "../components/searchBar";
import CustomerListScroll from '../components/customerListScroll';
import BottomNavigationBar from '../components/bottomNavigationBar';

function Home() 
{

  const [searchVal, setSearchVal] = useState("")

  return (
    <div>
      <SearchBar setSearchVal={setSearchVal} />
      <CustomerListScroll searchVal={searchVal} linkTo={'/customer/'} />
      <AddButton linkTo={'/create-customer'} />
      <BottomNavigationBar value={0} />
    </div>
  );
}

export default Home;
