'use client';

import {FormEvent} from "react";
import SearchBarComponent from "@/components/functionalComponents/searchBarComponent";
import {useFormControl} from "@/helpers/hooks/useFormControl";

export default function SearchLayout() {

    const [formValues, handleFormChange] = useFormControl({
        "searchVal": "",
    })


    const runSearch = () => {
        console.log("Running search for", formValues.searchVal);
    }

    return (
        <main className="">
            <div className="p-6">
                <SearchBarComponent onSubmit={runSearch} value={formValues.searchVal} onChange={handleFormChange("searchVal")} />
            </div>
            <div>users</div>
            <div>navbar</div>

        </main>
    )
}