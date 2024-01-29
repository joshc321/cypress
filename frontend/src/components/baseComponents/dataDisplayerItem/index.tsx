import { DataDisplayerItemSpec } from "@/components/baseComponents/dataDisplayerItem/dataDisplayerItem.spec";

export default function DataDisplayerItem(
    {
        icon,
        text,
        onClick
    } : DataDisplayerItemSpec
) {
    return (
        <li onClick={onClick} className={`px-3 py-2 flex flex-row items-center ${onClick && 'hover:bg-gray-light'}`}>
            <div className="mr-4">
                {icon}
            </div>
            <div className="text-sm font-thin">
                {text}
            </div>
        </li>
    )
}