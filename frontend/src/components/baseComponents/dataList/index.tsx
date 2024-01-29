import {DataListSpec} from "@/components/baseComponents/dataList/dataList.spec";
import DataListItem from "@/components/baseComponents/dataListItem";

export default function DataList(
    {
        data,
        linkTo
    }: DataListSpec) {
    return (
        <div className={"relative w-full overflow-y-scroll"}>
            <ul>
                {data.map((item, idx) => (
                    <DataListItem
                        key={idx}
                        primary={item.first}
                        secondary={item.address}
                        info={item.phone}
                        to={`${linkTo}${item._id}`}
                    />
                ))}
            </ul>
        </div>
    )
}