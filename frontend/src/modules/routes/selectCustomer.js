import { useState } from 'react'

import SearchBar from "../components/searchBar";
import CustomerListScroll from '../components/customerListScroll';
import BottomNavigationBar from '../components/bottomNavigationBar';
import useAuth from '../components/api/useAuth';

function SelectCustomer()
{
    useAuth();
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

