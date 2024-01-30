import { MdCalendarMonth,
    MdNote,
    MdOutlineNotes,
    MdLocalAtm,
    MdArrowForwardIos
 } from "react-icons/md";
import DataDisplayerItem from "../dataDisplayerItem";
import { ServiceRecordListSpec } from "./serviceRecordList.spec";
import Link from "next/link";


export default function ServiceRecordList(
    {
        serviceRecords,
        to
    } : ServiceRecordListSpec 
) {
    return (
        <div>
            {serviceRecords.map((serviceRecord) => (
                <Link href={`${to}?id=${serviceRecord.id}`} key={serviceRecord.id} className="relative">
                    <ul className="hover:bg-gray-light">
                        <MdArrowForwardIos className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray" />

                        <DataDisplayerItem 
                            icon={<MdCalendarMonth className="w-6 h-6 text-gray" />}
                            text={`${serviceRecord.date}`} 
                        />
                        <DataDisplayerItem 
                            icon={<MdNote className="w-6 h-6 text-gray" />}
                            text={`${serviceRecord.service}`} 
                        />
                        <DataDisplayerItem 
                            icon={<MdOutlineNotes className="w-6 h-6 text-gray" />}
                            text={`${serviceRecord.notes}`} 
                        />
                        <DataDisplayerItem 
                            icon={<MdLocalAtm className="w-6 h-6 text-gray" />}
                            text={`${serviceRecord.bill}`} 
                        />
                    </ul>
                    <hr className={"border-secondary-light border-2"} />
                </Link>
            ))}
            
        </div>
    )
}