
export interface DataDisplayerViewSpec {
    data: {
        address?: {
            street: string,
            city: string,
            state: string,
            zip: string
        },
        serviceInterval?: {
            duration: number,
            unit: string,
        }
        phone?: string,
        email?: string,
        notes?: string,
        system?: string,
        lastServiced?: string,
        nextService?: string,
        [propName: string]: any
    }
}