import { useState } from 'react'

import SearchBar from "../components/searchBar";
import CustomerListScroll from '../components/customerListScroll';
import BottomNavigationBar from '../components/bottomNavigationBar';

function SelectCustomer()
{

    const [searchVal, setSearchVal] = useState("")

    return(
        <>
            <SearchBar setSearchVal={setSearchVal} />
            <CustomerListScroll searchVal={searchVal} linkTo={'/scheduleservice?custid='} />
            <BottomNavigationBar />
        </>
    )
}

export default SelectCustomer;

