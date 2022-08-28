import { useState } from "react";
import TopBar from "../components/topBar";
import moment from "moment";
import StragglerList from "../components/stragglerList";
import BottomNavigationBar from "../components/bottomNavigationBar";
import useAuth from '../components/api/useAuth'
import GetStragglers from "../components/api/getStragglers";

function Stragglers()
{
    useAuth()
    const [stragglers, loading] = GetStragglers()

    return(
        <div>
            <TopBar primary="Stragglers" secondary={"Customers"}/>
            {!loading && <StragglerList customers={stragglers} />}
            <BottomNavigationBar />
        </div>
    )
}

export default Stragglers;