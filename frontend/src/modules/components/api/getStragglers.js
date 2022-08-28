import useGet from './useGet'

function GetStragglers() {
    return useGet('/api/stragglers')
}

export default GetStragglers;