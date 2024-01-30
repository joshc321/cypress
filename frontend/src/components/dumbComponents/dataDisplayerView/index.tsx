import { DataDisplayerViewSpec } from "@/components/dumbComponents/dataDisplayerView/dataDisplayerView.spec";
import { MdOutlineLocationOn, 
    MdLocalPhone, 
    MdCalendarMonth, 
    MdAccessTime,
    MdAutorenew,
    MdNote,
    MdOutlineNotes
} from "react-icons/md";
import DataDisplayerItem from "@/components/dumbComponents/dataDisplayerItem";
import formatAddress from "@/helpers/tools/formatAddress";
import MapsSelector from "@/helpers/tools/mapsSelector";
import formatPhone from "@/helpers/tools/formatPhone";
import formatDate from "@/helpers/tools/formatData";
import formatInterval from "@/helpers/tools/formatInterval";

export default function DataDisplayerView(
    {
        data
    } : DataDisplayerViewSpec
) {

    return (
        <div className="pt-2">

            <ul className="">      
                {data?.address && 
                    <DataDisplayerItem 
                        icon={<MdOutlineLocationOn className="w-6 h-6 text-gray" />} 
                        text={`${formatAddress(data?.address)}`} 
                        onClick={() => MapsSelector(formatAddress(data.address))}
                    />
                }
                {data?.phone && 
                    <DataDisplayerItem 
                        icon={<MdLocalPhone className="w-6 h-6 text-gray" />} 
                        text={`${formatPhone(data?.phone)}`} 
                    />
                }
                {data?.lastServiced && 
                    <DataDisplayerItem 
                        icon={<MdCalendarMonth className="w-6 h-6 text-gray" />} 
                        text={`${formatDate(data?.lastServiced)}`} 
                    />
                }
                {data?.nextService && 
                    <DataDisplayerItem 
                        icon={<MdAccessTime className="w-6 h-6 text-gray" />} 
                        text={`${formatDate(data?.nextService)}`} 
                    />
                }
                {data?.serviceInterval && 
                    <DataDisplayerItem 
                        icon={<MdAutorenew className="w-6 h-6 text-gray" />} 
                        text={`${formatInterval(data?.serviceInterval)}`} 
                    />
                }
            </ul>
            { (data?.system || data?.notes) && 
            
            <ul>
                <hr className={"border-secondary-light border-2 mt-2"} />
                {data?.system && 
                    <DataDisplayerItem 
                        icon={<MdNote className="w-6 h-6 text-gray" />}
                        text={`${data?.system}`} 
                    />
                }
                {data?.notes && 
                    <DataDisplayerItem 
                        icon={<MdOutlineNotes className="w-6 h-6 text-gray" />}
                        text={`${data?.notes}`} 
                    />
                }
            </ul>
            }
        </div>
    )
}