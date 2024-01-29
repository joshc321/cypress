'use client';

import SearchBarComponent from "@/components/functionalComponents/searchBarComponent";
import {useFormControl} from "@/helpers/hooks/useFormControl";
import DataList from "@/components/baseComponents/dataList";

export default function SearchLayout() {

    const [formValues, handleFormChange] = useFormControl({
        "searchVal": "",
    })


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
                <DataList data={data} linkTo={"/user?id="} />
            </div>
        </main>
    )
}

const data = [
    {
        first: "John",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
    {
        first: "Beck",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
    {
        first: "Ohio",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
    {
        first: "Ohio",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
    {
        first: "Ohio",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
    {
        first: "Ohio",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
    {
        first: "Ohio",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
    {
        first: "Ohio",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
    {
        first: "Ohio",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
]