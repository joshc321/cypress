import {SearchBarComponentSpec} from "@/components/functionalComponents/searchBarComponent/searchBarComponent.spec";
import SearchInput from "@/components/formComponents/searchInput";
import {FormEvent} from "react";

export default function SearchBarComponent(
    {
        onSubmit,
        value,
        onChange,
    } : SearchBarComponentSpec
) {

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit();
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="">
            <SearchInput handleSearch={handleSubmit} onChange={onChange} value={value} />
        </form>
    )
}