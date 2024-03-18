
export type ServiceRecord = {
    id: string;
    customer: {
        id: string;
        first: string;
        last: string;
    };
    system: string;
    date: string;
    notes: string;
    company: string;
    service: string;
    bill: number;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
    }
};