import useGet from './useGet'

function GetScheduledService(id='') {
    return useGet(`/api/serviceschedule/${id}`)
}

export default GetScheduledService;