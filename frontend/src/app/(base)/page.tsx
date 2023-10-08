'use client'

import {FormEvent} from "react";
import InputAdornment from "@/components/baseComponents/inputAdornment";
import IconButton from "@/components/baseComponents/iconButton";
import {MdSearch} from "react-icons/md";

export default function Home() {

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        console.log(e.target);
    }

  return (
    <main className="">
        <div className="p-6">
            <form noValidate className="">
                <InputAdornment
                    className="bg-gray-light rounded-full"
                    type="text"
                    id="search"
                    placeholder="search"
                    adornmentElement={
                        <IconButton
                            icon={<MdSearch className="w-6 h-6" />}
                            onClick = {() => console.log("click")}
                        />
                    }
                />
            </form>
        </div>
        <div>users</div>
        <div>navbar</div>

    </main>
  )
}
