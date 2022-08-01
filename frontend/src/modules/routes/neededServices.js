import { useState } from "react";
import TopBar from "../components/topBar";
import moment from "moment";
import StragglerList from "../components/stragglerList";
import BottomNavigationBar from "../components/bottomNavigationBar";

function NeededServices()
{
    const [stragglers, setStragglers] = useState(stragglersExample)

    return(
        <>
            <TopBar primary="Upcoming" secondary={"Customers"}/>
            <StragglerList test={stragglers} />
            <BottomNavigationBar value={3} />
        </>
    )
}

export default NeededServices;



const stragglersExample = [
    {
        _id: ')S(D*FY098d&^',
        phone: '951 432 4324',
        first: 'joshua',
        last: 'cordero',
        nextService: moment()
    },
    {
        _id: 's09d8f7g0sd9',
        phone: '951 432 4324',
        first: 'random',
        last: 'person',
        nextService: moment()
    },
    {
        _id: 'a08s7d6f087ad',
        phone: '951 354 4324',
        first: 'name',
        last: 'last',
        nextService: moment()
    },
    {
        _id: 'lakjsdfo87aysdf',
        phone: '951 432 4324',
        first: 'john',
        last: 'doe',
        nextService: moment()
    },
    {
        _id: ')S(D*FY098d&^',
        phone: '951 432 4324',
        first: 'joshua',
        last: 'cordero',
        nextService: moment()
    },
    {
        _id: 's09d8f7g0sd9',
        phone: '951 432 4324',
        first: 'random',
        last: 'person',
        nextService: moment()
    },
    {
        _id: 'a08s7d6f087ad',
        phone: '951 354 4324',
        first: 'name',
        last: 'last',
        nextService: moment()
    },
    {
        _id: 'lakjsdfo87aysdf',
        phone: '951 432 4324',
        first: 'john',
        last: 'doe',
        nextService: moment()
    },
]