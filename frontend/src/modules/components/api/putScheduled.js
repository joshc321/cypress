import putData from './putData'

function putScheduled(data={}, id='') {
    return putData(`/api/serviceschedule/${id}`, data)
}

export default putScheduled;