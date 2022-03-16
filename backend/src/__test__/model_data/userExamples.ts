/**
 * @module userExamples
 */

const noCompanyUser = {
    first: "no",
    last: "company",
    email: "aa@gmail.com",
    password: "123456",
}

const level2User = {
    first: "some2",
    last: "guy2",
    email: "a@gmail.com",
    permissionLevel: 2,
    company: "622aa4f76d5744019a22cd4e",
    password: "123456",
}

const level1User = {
    first: "some1",
    last: "guy1",
    email: "b@gmail.com",
    permissionLevel: 1,
    company: "622aa4f76d5744019a22cd4e",
    password: "123456",
}

const level0User = {
    first: "level0first",
    last: "guy0",
    email: "c@gmail.com",
    permissionLevel: 0,
    company: "622aa4f76d5744019a22cd4e",
    password: "123456",
}

const otherCompanyUser = {
    first: "new",
    last: "guyC",
    email: "d@gmail.com",
    permissionLevel: 0,
    company: "622aa4f76d5744019a22cd4b",
    password: "123456",
}

export { level2User, level1User, level0User, otherCompanyUser, noCompanyUser }