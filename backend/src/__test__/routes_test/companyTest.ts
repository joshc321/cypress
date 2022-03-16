/**
 * @module TestCompanys
 */

import Company from '../../models/company'
import { company1, company2 } from '../model_data/companyExamples'
import supertest from "supertest"
import login from '../helpers/login'
import createUser from '../helpers/createUser'
import createUsers from '../helpers/createUsers'
import { level2User } from '../model_data/userExamples'

 
async function createCompany(body){
    const comp = await Company.create(body);
    return comp
}

const user1 = {
    first: "user",
    last: "one",
    email: "usr1@gmail.com",
    password: "123456",
    permissionLevel: 1
}

const user0 = {
    first: "user",
    last: "two",
    email: "usr2@gmail.com",
    password: "123456",
}


function testCompanys(app) {
    
    test("POST /api/company", async () => {

        //test create company
        await supertest(app)
            .post("/api/company")
            .send(company1)
            .expect(200)
            .then(async (response) => {
                expect(response.body).toBeTruthy()
                expect(response.body.name).toBe(company1.name)
                const pcompany = await Company.findById(response.body._id)
                expect(pcompany).toBeTruthy()
            })
    })

    test("GET /api/company/:id", async () => {
        const comp1 = await createCompany(company1)
        const comp2 = await createCompany(company2)
        user1['company'] = comp1.id
        user0['company'] = comp2.id
        const usr1 = await createUser(user1)
        const auth = await login(app, user1)
        const usr2 = await createUser(user0)
        const auth1 = await login(app, user0)

        await createUser(level2User)
        const auth2 = await login(app, level2User)

        await supertest(app)
            .get(`/api/company/${usr1.company}`)
            .set('Authorization', 'bearer ' + auth)
            .expect(200)
            .then(async (response) => {
                expect(response.body).toBeTruthy()
                expect(response.body.name).toBe(comp1.name)
            })
        
        await supertest(app)
            .get(`/api/company/${comp2._id}`)
            .set('Authorization', 'bearer ' + auth)
            .expect(403)
        
        await supertest(app)
            .get(`/api/company/${comp2._id}`)
            .set('Authorization', 'bearer ' + auth1)
            .expect(200)
            .then(async (response) => {
                expect(response.body).toBeTruthy()
                expect(response.body.name).toBe(comp2.name)
            })
        
        await supertest(app)
            .get(`/api/company/${comp2._id}`)
            .set('Authorization', 'bearer ' + auth2)
            .expect(200)
            .then(async (response) => {
                expect(response.body).toBeTruthy()
                expect(response.body.name).toBe(comp2.name)
            })
    });

    test("PUT /api/company/:id", async () => {
        const comp1 = await createCompany(company1)
        const comp2 = await createCompany(company2)
        user1['company'] = comp1.id
        user0['company'] = comp2.id
        const usr1 = await createUser(user1)
        const auth = await login(app, user1)
        const usr2 = await createUser(user0)
        const auth1 = await login(app, user0)

        await createUser(level2User)
        const auth2 = await login(app, level2User)

        await supertest(app)
            .put(`/api/company/${usr1.company}`)
            .set('Authorization', 'bearer ' + auth)
            .send({ name: 'another' })
            .expect(200)
            .then(async (response) => {
                expect(response.body).toBeTruthy()
                const pcomp = await Company.findById(usr1.company)
                expect(pcomp.name).toBe('another')
            })
        
        await supertest(app)
            .put(`/api/company/${comp2._id}`)
            .set('Authorization', 'bearer ' + auth)
            .send({ name: 'updated' })
            .expect(403)
        
        await supertest(app)
            .put(`/api/company/${comp2._id}`)
            .set('Authorization', 'bearer ' + auth1)
            .send({ name: 'updated' })
            .expect(403)
        
        await supertest(app)
            .put(`/api/company/${comp2._id}`)
            .set('Authorization', 'bearer ' + auth2)
            .send({ name: 'new name' })
            .expect(200)
            .then(async (response) => {
                expect(response.body).toBeTruthy()
                const pcomp = await Company.findById(comp2._id)
                expect(pcomp.name).toBe('new name')
            })
    });

    test("DELETE /api/company/:id", async () => {
        const comp1 = await createCompany(company1)
        const comp2 = await createCompany(company2)
        user1['company'] = comp1.id
        user0['company'] = comp2.id
        const usr1 = await createUser(user1)
        const auth = await login(app, user1)
        const usr2 = await createUser(user0)
        const auth1 = await login(app, user0)

        await createUser(level2User)
        const auth2 = await login(app, level2User)

        await supertest(app)
            .delete(`/api/company/${comp2._id}`)
            .set('Authorization', 'bearer ' + auth)
            .expect(403)

        await supertest(app)
            .delete(`/api/company/${comp2._id}`)
            .set('Authorization', 'bearer ' + auth1)
            .expect(403)

        await supertest(app)
            .delete(`/api/company/${usr1.company}`)
            .set('Authorization', 'bearer ' + auth)
            .expect(200)
            .then(async () => {
                const pcomp = await Company.findById(usr1.company)
                expect(pcomp).toBeFalsy()
            })
        
        
        await supertest(app)
            .delete(`/api/company/${comp2._id}`)
            .set('Authorization', 'bearer ' + auth2)
            .expect(200)
            .then(async () => {
                const pcomp = await Company.findById(comp2._id)
                expect(pcomp).toBeFalsy()
            })
    });

}


 
 export default testCompanys