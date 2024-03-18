import { ServiceRecord } from "@/features/serviceRecords";

export type Customer = {
    id: string;
    phone?: string;
    email?: string;
    first?: string;
    last?: string;
    address: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    serviceInterval: {
        duration: number;
        unit: string;
    }
    system: string;
    notes: string;
    company: string;
    lastServiced?: string;
    status: string;
    nextService: string;
    scheduledService?: string;
    serviceRecords?: ServiceRecord[];
};