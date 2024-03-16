'use client';
import { SearchInputSpec } from "@/components/formComponents/searchInput/searchInput.spec"
import IconButton from "@/components/baseComponents/iconButton";
import {MdSearch, MdFilterList} from "react-icons/md";
import InputAdornment from "@/components/baseComponents/inputAdornment";
import DualAdornmentInput from "@/components/baseComponents/dualAdornmentInput";

export default function SearchInput(
    {
        handleSearch,
        onChange,
        value,
    } : SearchInputSpec
) {
    return (
        // <InputAdornment
        //     className="bg-gray-light border-0 rounded-3xl"
        //     type="text"
        //     id="search"
        //     onChange={onChange}
        //     value={value}
        //     placeholder="Search"
        //     adornmentElement={
        //         <IconButton
        //             icon={<MdSearch className="w-6 h-6" />}
        //             onClick = {handleSearch}
        //         />
        //     }
        // />
        <DualAdornmentInput
            className="bg-gray-light border-0 rounded-3xl"
            type="text"
            id="search"
            onChange={onChange}
            value={value}
            placeholder="Search"
            leftAdornmentElement={
                <IconButton
                    icon={<MdSearch className="w-6 h-6 z-auto" />}
                    onClick = {handleSearch}
                />
            }
            rightAdornmentElement={
                <IconButton
                    icon={<MdFilterList className="w-6 h-6" />}
                    onClick = {() => console.log("filter")}
                />
            }
        />
    )
}