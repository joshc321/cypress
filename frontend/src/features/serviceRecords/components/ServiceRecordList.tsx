import { MdCalendarMonth,
    MdNote,
    MdOutlineNotes,
    MdLocalAtm,
    MdArrowForwardIos
 } from "react-icons/md";
import { DataListItem } from "@/components/Elements/DataButton";
import Link from "next/link";
import { Divider } from "@/components/Elements/Divider";
import { formatDate } from "@/utils/format";
import { ServiceRecord } from "../types";

type ServiceRecordListProps = {
    serviceRecords: ServiceRecord[] | undefined;
    to: string;
};

export const ServiceRecordList = (
    {
        serviceRecords,
        to
    } : ServiceRecordListProps 
) => {
    return (
        <div>
            {serviceRecords?.map((serviceRecord) => (
                <Link href={`${to}?id=${serviceRecord.id}`} key={serviceRecord.id} className="relative">
                    <MdArrowForwardIos className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray" />

                    <ul className="hover:bg-gray-light">
                        <DataListItem 
                            icon={<MdCalendarMonth className="w-6 h-6 text-gray" />}
                            text={formatDate(serviceRecord.date)} 
                        />
                        <DataListItem 
                            icon={<MdNote className="w-6 h-6 text-gray" />}
                            text={`${serviceRecord.service}`} 
                        />
                        <DataListItem 
                            icon={<MdOutlineNotes className="w-6 h-6 text-gray" />}
                            text={`${serviceRecord.notes}`} 
                        />
                        <DataListItem 
                            icon={<MdLocalAtm className="w-6 h-6 text-gray" />}
                            text={`${serviceRecord.bill}`} 
                        />
                    </ul>
                    <Divider />
                </Link>
            ))}
            
        </div>
    )
}