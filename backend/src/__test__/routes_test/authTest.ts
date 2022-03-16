/**
 * @module TestAuth
 */

import User from '../../models/user'
import { level0User, level1User, level2User, noCompanyUser } from '../model_data/userExamples'
import supertest from "supertest"

function testAuth(app) {
    
    test("POST /api/login", async () => {

        await User.create(level1User)

        //login
        await supertest(app)
            .post("/api/login")
            .send(level1User)
            .expect(200)
            .then(async (response) => {
                // Check the response type and length
                expect(response.body.user).toBeTruthy();
                expect(response.body.user.first).toBe(level1User.first);
                expect(response.body.user.email).toBe(level1User.email);
                expect(response.body.token).toBeTruthy();
            })
    })

    test("POST /api/newuser", async () => {

        let authToken = null

        const user = await User.create(level1User)

        const data = level1User

        //login
        await supertest(app)
            .post("/api/login")
            .send(data)
            .expect(200)
            .then(async (response) => {
                
                expect(response.body.user.first).toBe(user.first);
                expect(response.body.user.email).toBe(user.email);
                expect(response.body.token).toBeTruthy();
                authToken = response.body.token;
            })
        
        //create new user
        await supertest(app)
            .post("/api/newuser")
            .set('Authorization', 'bearer ' + authToken)
            .send(noCompanyUser)
            .expect(200)
            .then(async (response) => {
                expect(response.body.first).toBe(noCompanyUser.first)
                expect(response.body.company).toBe(level1User.company)
                const new_user = await User.findById(response.body._id)
                expect(new_user).toBeTruthy()
            })
        
        await supertest(app)
        .post("/api/newuser")
        .set('Authorization', 'bearer ' + authToken)
        .send(level1User)
        .expect(200)
        .then(async (response) =>{
            expect(response.body.first).toBe(level1User.first)
            const new_user = await User.findById(response.body._id)
            expect(new_user).toBeTruthy()
        })

        await supertest(app)
        .post("/api/newuser")
        .set('Authorization', 'bearer ' + authToken)
        .send(level2User)
        .expect(403)

        const user0 = await User.create(level0User)

        const data0 = level0User

        //login
        await supertest(app)
            .post("/api/login")
            .send(data0)
            .expect(200)
            .then(async (response) => {
                expect(response.body.user.first).toBe(user0.first);
                expect(response.body.user.email).toBe(user0.email);
                expect(response.body.token).toBeTruthy();
                authToken = response.body.token;
            })
        
        await supertest(app)
        .post("/api/newuser")
        .set('Authorization', 'bearer ' + authToken)
        .send(level0User)
        .expect(403)

    })
}

export default testAuth