import { MdOutlineLocationOn, 
    MdOutlineMoney, 
    MdAccessTime,
    MdNote,
    MdOutlineNotes
} from "react-icons/md";
import { DataListItem, Divider } from "@/components/Elements";
import { formatAddress, formatPhone, formatDate } from "@/utils/format";
import { mapsSelector } from "@/utils/selector";
import { ScheduledService } from "../types";


export type ScheduledServiceViewerProps = {
    data?: ScheduledService
}

export const ScheduledServiceDataViewer = (
    {
        data
    } : ScheduledServiceViewerProps
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
                    icon={<MdOutlineMoney className="w-6 h-6 text-gray" />} 
                    text={`${data?.estimate}`} 
                />
                
                <DataListItem 
                    icon={<MdAccessTime className="w-6 h-6 text-gray" />} 
                    text={`${data?.date ? formatDate(data?.date) : 'N/A'}` }
                />
                
                
            </ul>
            { (data?.service || data?.notes) && 
            
            <ul>
                <Divider size='md' className='mt-2' />
                {data?.service && 
                    <DataListItem 
                        icon={<MdNote className="w-6 h-6 text-gray" />}
                        text={`${data?.service}`} 
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