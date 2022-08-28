import useGet from './useGet'

function GetServiceRecord(id='') {
    return useGet(`/api/servicerecord/${id}`)
}

export default GetServiceRecord;