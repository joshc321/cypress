import { useState } from 'react';

// dummy api call to get array of customers

export default function getCustomers() {
    const [data, setData] = useState(dummy_data);
    const [loading, setLoading] = useState(false);

    return { data, loading };
}


const dummy_data = [
    {
        first: "John",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
    {
        first: "Beck",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
    {
        first: "Ohio",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
    {
        first: "Ohio",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
    {
        first: "Ohio",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
    {
        first: "Ohio",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
    {
        first: "Ohio",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
    {
        first: "Ohio",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
    {
        first: "Ohio",
        address: "120 address ave hemet ca",
        phone: "952134213",
        _id: "3-28412"
    },
];