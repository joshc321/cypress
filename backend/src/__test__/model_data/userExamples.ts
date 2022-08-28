/**
 * @module userExamples
 */

const noCompanyUser = {
    first: "no",
    last: "company",
    email: "aa@gmail.com",
    // deepcode ignore NoHardcodedPasswords/test: <please specify a reason of ignoring this>, deepcode ignore NoHardcodedPasswords/test: <please specify a reason of ignoring this>
    password: "akjsdhf&78",
}

const level2User = {
    first: "some2",
    last: "guy2",
    email: "a@gmail.com",
    permissionLevel: 2,
    company: "622aa4f76d5744019a22cd4e",
    password: "asd)*(&S^DF",
}

const level1User = {
    first: "some1",
    last: "guy1",
    email: "b@gmail.com",
    permissionLevel: 1,
    company: "622aa4f76d5744019a22cd4e",
    password: "asdf)*&^",
}

const level0User = {
    first: "level0first",
    last: "guy0",
    email: "c@gmail.com",
    permissionLevel: 0,
    company: "622aa4f76d5744019a22cd4e",
    password: "dsf;khjg09z*&^",
}

const otherCompanyUser = {
    first: "new",
    last: "guyC",
    email: "d@gmail.com",
    permissionLevel: 0,
    company: "622aa4f76d5744019a22cd4b",
    password: "asdf(*&^",
}

export { level2User, level1User, level0User, otherCompanyUser, noCompanyUser }