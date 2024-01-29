import {IconButtonSpec} from "@/components/baseComponents/iconButton/iconButton.spec";


export default function IconButton(
    {
        icon,
        onClick
    }: IconButtonSpec){
    return(
        <button
            type="button"
            className="border-none active:opacity-80 hover:bg-secondary-light rounded-full p-1"
            onClick={onClick}
        >
            {icon}
        </button>
    )
}