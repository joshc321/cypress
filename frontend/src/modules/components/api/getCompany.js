import getData from "./getData";

function getCompany(id='') {
    return getData(`/api/company/${id}`)
}

export default getCompany;