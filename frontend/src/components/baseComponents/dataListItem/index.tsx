import {DataListItemSpec} from "@/components/baseComponents/dataListItem/dataListItem.spec";
import { MdArrowForwardIos } from "react-icons/md"
export default function DataListItem(
    {
        primary,
        secondary,
        info,
        to,
    }: DataListItemSpec ) {
    return (
        <li className={"hover:bg-gray-light relative overflow-scroll"}>
            <a href={to} className={"w-full flex flex-row items-center justify-between px-4 py-2"}>
                <div className={""}>
                    <p className={"text-xs font-light text-secondary-dark"}>{info}</p>
                    <h3 className={"text-lg font-semibold text-secondary-dark"}>{primary}</h3>
                    <h4 className={"text-sm font-light text-secondary-dark"}>{secondary}</h4>
                </div>
                <MdArrowForwardIos className={"h-6 w-6"} />
            </a>
            <hr className={"border-secondary-light mx-3"} />
        </li>
    )
}