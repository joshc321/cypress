

export type ScheduledService = {
    id: string;
    date: string;
    service: string;
    notes: string;
    estimate: number;
    company: string;
    customer?: {
        id: string;
        first: string;
        last: string;
    };
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
    }
};