/**
 * @module TestAuth
 */

import User from '../../models/user'
import { level0User, level1User, level2User, noCompanyUser, otherCompanyUser } from '../model_data/userExamples'
import supertest from "supertest"
import login from '../helpers/login'
import createUser from '../helpers/createUser'
import { response } from 'express'


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

    test("POST /api/newuser password is encrypted", async () => {
        await createUser(level2User)
        const auth = await login(app, level2User);

        await supertest(app)
            .post("/api/newuser")
            .set('Authorization', 'bearer ' + auth)
            .send(noCompanyUser)
            .expect(200)
            .then(async (response) => {
                expect(response.body.password === noCompanyUser.password).toBeFalsy()
                const usr = await User.findById(response.body._id)
                expect(usr).toBeTruthy()
                if(usr) expect(await usr.validatePassword(noCompanyUser.password)).toBeTruthy()
            })

    })

    test("POST /api/newuser", async () => {

        let authToken = null

        //setup
        await createUser(level1User)
        //login to get auth token
        authToken = await login(app, level1User)
        
        //test creating a new user with no company
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

        //test creating a new user with set company
        await supertest(app)
            .post("/api/newuser")
            .set('Authorization', 'bearer ' + authToken)
            .send(otherCompanyUser)
            .expect(200)
            .then(async (response) => {
                expect(response.body.first).toBe(otherCompanyUser.first)
                expect(response.body.company).toBe(level1User.company)
                const new_user = await User.findById(response.body._id)
                expect(new_user).toBeTruthy()
            })
        

        //creating user of higher authorization level fails
        await supertest(app)
        .post("/api/newuser")
        .set('Authorization', 'bearer ' + authToken)
        .send(level2User)
        .expect(403)

        //sign in with level 0 user
        await createUser(level0User)
        authToken = await login(app, level0User);
        
        //level 0 user cannot create new users
        await supertest(app)
        .post("/api/newuser")
        .set('Authorization', 'bearer ' + authToken)
        .send(level0User)
        .expect(403)

        //auth token required
        await supertest(app)
        .post("/api/newuser")
        .send(level0User)
        .expect(401)

        await createUser(level2User)
        authToken = await login(app, level2User);

        //test creating a new user with set company with level 2 user
        await supertest(app)
            .post("/api/newuser")
            .set('Authorization', 'bearer ' + authToken)
            .send(otherCompanyUser)
            .expect(200)
            .then(async (response) => {
                expect(response.body.first).toBe(otherCompanyUser.first)
                expect(response.body.company).toBe(otherCompanyUser.company)
                const new_user = await User.findById(response.body._id)
                expect(new_user).toBeTruthy()
            })

    })
}

export default testAuth