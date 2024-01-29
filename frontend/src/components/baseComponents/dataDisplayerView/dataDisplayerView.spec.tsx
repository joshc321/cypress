
export interface DataDisplayerViewSpec {
    // define data to be a JSON object containing the keys first, last, email, phone, address and optionally service_data and notes
    data: {
        address?: {
            street: string,
            city: string,
            state: string,
            zip: string
        },
        phone?: string,
        email?: string,
        notes?: string,
        system?: string,
        lastServiced?: string,
        nextService?: string,
        [propName: string]: any
    }
}