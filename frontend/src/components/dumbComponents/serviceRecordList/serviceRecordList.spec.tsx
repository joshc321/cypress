
export interface ServiceRecordListSpec {
    serviceRecords: {
        id: string,
        date: string,
        service: string,
        notes: string,
        bill: string,
        [propName: string]: any
    }[],
    to: string,
    [propName: string]: any
}