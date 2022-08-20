import postData from "./postData";
import { useState, useEffect } from "react";
import moment from "moment";

export default function useScheduledServices(selectedDate)
{
    const [services, setServices] = useState([]);

    useEffect(() => {

        const data = {
            gt: moment(selectedDate).startOf('day'),
            lt: moment(selectedDate).endOf('day'),
        }

        postData('/api/serviceschedule/s', data)
          .then((rsp) => {
            const [body, status] = rsp;
            if(status === 200) setServices(body)
          })
    }, [selectedDate])

    return services;
}