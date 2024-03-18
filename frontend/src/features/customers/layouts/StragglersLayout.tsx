'use client';

import { TopBar } from "@/components/Elements"
import { CustomerList } from "../components/CustomerList"
import { useStragglers } from "../api/getStragglers";


export const StragglersLayout = () => {
    const stragglers = useStragglers();

    return (
        <div>
            <TopBar primaryText="Stragglers" secondaryText="Customers" />

            <div className="pt-52">
                {stragglers.data && 
                    <CustomerList 
                        data={stragglers.data}
                        linkTo="/customer?id="
                    />
                }
            </div>
        </div>
    )
}