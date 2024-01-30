'use client';

import SearchBarComponent from "@/components/functionalComponents/searchBarComponent";
import {useFormControl} from "@/helpers/hooks/useFormControl";
import DataList from "@/components/dumbComponents/dataList";
import getCustomers from "@/helpers/data_fetching/specific/getCustomers";

export default function SearchLayout() {

    const [formValues, handleFormChange] = useFormControl({
        "searchVal": "",
    })

    const customer_data = getCustomers();


    const runSearch = () => {
        console.log("Running search for", formValues.searchVal);
    }

    return (
        <main className="">
            <div className="sticky top-0 left-0 z-50 p-6 bg-white">
                <SearchBarComponent onSubmit={runSearch} value={formValues.searchVal} onChange={handleFormChange("searchVal")} />
            </div>
            <hr className={"border-secondary-light mx-3"} />
            <div className="pb-20">
                <DataList data={customer_data.data} linkTo={"/customer?id="} />
            </div>
        </main>
    )
}