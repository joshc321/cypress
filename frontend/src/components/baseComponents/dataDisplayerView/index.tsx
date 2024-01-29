import { DataDisplayerViewSpec } from "@/components/baseComponents/dataDisplayerView/dataDisplayerView.spec";
import { MdOutlineLocationOn } from "react-icons/md";
import DataDisplayerItem from "../dataDisplayerItem";

export default function DataDisplayerView(
    {
        data
    } : DataDisplayerViewSpec
) {

    return (
        <div className="pt-2">

            <ul className="">      
                {data.address?.city && 
                    <DataDisplayerItem 
                        icon={<MdOutlineLocationOn className="w-8 h-8 text-primary" />} 
                        text={`${data.address?.street} ${data.address?.city}, ${data.address?.state} ${data.address?.zip}`} 
                        onClick={() => {console.log('go to address')}}
                    />
                }
                
            </ul>      
        </div>
    )
}