'use client';

import DataDisplayerView from "@/components/baseComponents/dataDisplayerView";
import TopBar from "@/components/baseComponents/topbar";
import getCustomer from "@/helpers/data_fetching/specific/getCustomer";


export default function CustomerLayout() {

    const customer = getCustomer("1");

    return (
        <div>
            <TopBar primaryText="Customer Name" secondaryText="Information" to={"edit-customer?id=adsf"} />
            <div className="pt-52 pb-20">
                <DataDisplayerView data={customer.data} />
            </div>
        </div>

    )
}