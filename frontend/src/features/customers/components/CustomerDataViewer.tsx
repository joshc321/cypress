import { MdOutlineLocationOn, 
    MdLocalPhone, 
    MdCalendarMonth, 
    MdAccessTime,
    MdAutorenew,
    MdNote,
    MdOutlineNotes
} from "react-icons/md";
import { DataListItem, Divider } from "@/components/Elements";
import { formatAddress, formatPhone, formatDate, formatInterval } from "@/utils/format";
import { mapsSelector } from "@/utils/selector";
import { Customer } from "../types";


export type CustomerDataViewerProps = {
    data?: Customer
}

export const CustomerDataViewer = (
    {
        data
    } : CustomerDataViewerProps
) => {

    return (
        <div className="pt-2">

            <ul className="">      
                <DataListItem 
                    icon={<MdOutlineLocationOn className="w-6 h-6 text-gray" />} 
                    text={`${formatAddress(data?.address)}`} 
                    onClick={() => mapsSelector(formatAddress(data?.address))}
                />
                
                <DataListItem 
                    icon={<MdLocalPhone className="w-6 h-6 text-gray" />} 
                    text={`${formatPhone(data?.phone)}`} 
                />
                
                {data?.lastServiced && 
                    <DataListItem 
                        icon={<MdCalendarMonth className="w-6 h-6 text-gray" />} 
                        text={`${formatDate(data?.lastServiced)}`} 
                    />
                }
                {data?.nextService && 
                    <DataListItem 
                        icon={<MdAccessTime className="w-6 h-6 text-gray" />} 
                        text={`${formatDate(data?.nextService)}`} 
                    />
                }
                <DataListItem 
                    icon={<MdAutorenew className="w-6 h-6 text-gray" />} 
                    text={`${formatInterval(data?.serviceInterval)}`} 
                />
                
            </ul>
            { (data?.system || data?.notes) && 
            
            <ul>
                <Divider size='md' className='mt-2' />
                {data?.system && 
                    <DataListItem 
                        icon={<MdNote className="w-6 h-6 text-gray" />}
                        text={`${data?.system}`} 
                    />
                }
                {data?.notes && 
                    <DataListItem 
                        icon={<MdOutlineNotes className="w-6 h-6 text-gray" />}
                        text={`${data?.notes}`} 
                    />
                }
            </ul>
            }
        </div>
    )
}