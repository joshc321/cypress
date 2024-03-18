import { DisplayButtonLink } from "@/components/Elements/DataButton";
import { Divider } from "@/components/Elements/Divider";
import { Customer } from "../types";
import { formatAddress, formatPhone } from "@/utils/format";

export type CustomerListProps = {
    data: Customer[],
    linkTo: string
}

export const CustomerList = (
    {
        data,
        linkTo
    }: CustomerListProps) => {
    return (
        <div className={"relative w-full overflow-y-scroll"}>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        <DisplayButtonLink 
                            primary={item.first}
                            secondary={formatAddress(item.address)}
                            info={formatPhone(item.phone)}
                            to={`${linkTo}${item.id}`}
                        />
                        <Divider variant="middle" size="sm" />
                    </li>
                ))}
            </ul>
        </div>
    )
}