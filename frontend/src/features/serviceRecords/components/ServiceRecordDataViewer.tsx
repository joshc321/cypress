import { MdOutlineLocationOn, 
    MdLocalPhone, 
    MdCalendarMonth, 
    MdAccessTime,
    MdAutorenew,
    MdNote,
    MdOutlineNotes
} from "react-icons/md";
import { DataListItem, Divider } from "@/components/Elements";
import { formatAddress, formatPhone, formatDate } from "@/utils/format";
import { mapsSelector } from "@/utils/selector";
import { ServiceRecord } from "../types";


export type ServiceRecordViewerProps = {
    data?: ServiceRecord
}

export const ServiceRecordDataViewer = (
    {
        data
    } : ServiceRecordViewerProps
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
                    text={`${formatPhone(data?.date)}`} 
                />
                
                <DataListItem 
                    icon={<MdAccessTime className="w-6 h-6 text-gray" />} 
                    text={`${data?.date ? formatDate(data?.date) : 'N/A'}` }
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
                <Divider />
            </ul>
            }
        </div>
    )
}