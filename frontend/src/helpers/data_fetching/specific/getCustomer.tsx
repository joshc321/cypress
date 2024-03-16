import { useState } from 'react';

// dummy api call to get a customer

export default function getCustomer(id: string) {
    const [data, setData] = useState(dummy_data);
    const [loading, setLoading] = useState(false);

    return { data, loading };
}


const dummy_data = 
{
    address: {
        street: "P.O. box 519",
        city: "winchester",
        state: "CA",
        zip: "92596"
    },
    serviceInterval: {
        "duration": 1,
        "unit": "years"
    },
    _id: "6392cc174a8514d8f531b73e",
    first: "Resevoir",
    last: "A.W.Z.",
    phone: "765-2020",
    system: "",
    notes: "287,400, 422",
    email: "",
    company: "6392cbdf4a8514d8f531b738",
    lastServiced: "2021-12-08T00:00:00.000Z",
    status: "active",
    id: "6392cc174a8514d8f531b73e",
    "nextService": "2022-12-08T00:00:00.000Z",
    "__v": 0,
    "createdAt": "2022-12-09T05:48:08.873Z",
    "updatedAt": "2022-12-09T05:51:12.990Z",
    "services": [
        {
            "date": "2021-12-08T00:00:00.000Z",
            "system": "whatevs",
            "service": "287,400, 422",
            "notes": "hello there sir",
            "bill": "0",
            "id": "6392cc174a8514d8f531b73f"
        },
        {
            "date": "2021-12-08T00:00:00.000Z",
            "service": "287,waa, 422",
            "notes": "hello there sir",
            "bill": "0",
            "id": "6392cc174a8524dkjs31b73f"
        }
    ],
    "scheduledService": null,
};