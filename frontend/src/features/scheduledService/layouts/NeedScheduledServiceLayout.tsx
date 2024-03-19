'use client';

import { TopBar, DisplayButtonLink, Divider, SectionHeading } from "@/components/Elements";
import { useNeedScheduledService } from "../api/getNeedScheduledService";
import { NeedScheduledService } from "../types";
import { formatAddress, formatPhone } from "@/utils/format";
import React from "react";
import { format } from "path";

export const NeedScheduledServiceLayout = () => {
    const needScheduledService = useNeedScheduledService({});
    const [reducedData, setReducedData] = React.useState<{ dateKey: string, data: NeedScheduledService[] }[]>([]);

    React.useEffect(() => {

        if(needScheduledService.data === undefined) return;

        const groupedData = needScheduledService.data.reduce((acc, item) => {
            const date = new Date(item.date);
            // const monthYearKey = date.toLocaleDateString('en-US', { month: 'numeric', year: 'numeric' });
            // const month = new Date(item.date).getMonth();
            // const year = new Date(item.date).getFullYear();
            // const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(0, month));
            const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
            if (!acc[startOfMonth]) {
              acc[startOfMonth] = [];
            }
        
            acc[startOfMonth].push(item);
            return acc;
          }, {} as { [key: string]: NeedScheduledService[] });

        console.log(groupedData);
        // convert the object to an array sorted by date
        const sortedReduced = Object.entries(groupedData).map(([key, value]) => {
            return {
                dateKey: key,
                data: value
            }
        }).sort((a, b) => {
            const dateA = new Date(a.dateKey);
            const dateB = new Date(b.dateKey);
            return dateA.getTime() - dateB.getTime();
        });
        console.log(sortedReduced);
        setReducedData(sortedReduced);
        
    
    }, [needScheduledService.data])

    

    return (
        <div>
            <TopBar primaryText="To Schedule" />

            <div className="pt-40">
            {reducedData.map((data) => (
                    <div key={data.dateKey}>
                        <SectionHeading 
                            text={new Date(data.dateKey).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        />
                        <ul>
                            {data.data.map((item, idx) => (
                                <li key={item.date}>
                                    <DisplayButtonLink
                                        primary={`${item.customer.first} ${item.customer.last}`}
                                        secondary={formatAddress(item.address)}
                                        info={formatPhone(item.customer.phone)}
                                        to={`/scheduled-service/create?id=${item.customer.id}`}
                                    />
                                    {idx < data.data.length - 1 && <Divider size="sm" variant="middle" />}
                                </li>
                            ))}
                        </ul>
                        <Divider />
                    </div>
                
            ))
            }
            </div>
        </div>
    )
}