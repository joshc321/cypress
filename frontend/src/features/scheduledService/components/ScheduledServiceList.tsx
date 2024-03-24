import { DisplayButtonLink } from "@/components/Elements/DataButton";
import { Divider } from "@/components/Elements/Divider";
import { ScheduledService } from "../types";
import { formatAddress, formatPhone, formatDateTime } from "@/utils/format";

export type ScheduledServiceListProps = {
    data: ScheduledService[],
    linkTo: string
}

export const ScheduledServiceList = (
    {
        data,
        linkTo
    }: ScheduledServiceListProps) => {
    return (
        <div className={"relative w-full overflow-y-scroll"}>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        <DisplayButtonLink 
                            primary={formatAddress(item.address)}
                            secondary={formatDateTime(item.date)}
                            info={formatPhone(item.customer?.phone)}
                            to={`${linkTo}${item.id}`}
                        />
                        <Divider variant="middle" size="sm" />
                    </li>
                ))}
            </ul>
        </div>
    )
}