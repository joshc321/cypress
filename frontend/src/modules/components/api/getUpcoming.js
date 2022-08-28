import useGet from './useGet'

function GetUpcoming() {
    return useGet('/api/scheduleplanner')
}

export default GetUpcoming;