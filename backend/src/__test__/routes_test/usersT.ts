/**
 * @module TestUsers
 */

 import User from '../../models/user'
 import { level0User, level1User, level2User, otherCompanyUser } from '../model_data/userExamples'
 import supertest from "supertest"
 import login from '../helpers/login'
 import createUsers from '../helpers/createUsers'
 

function testUsers(app) {
    
    test("GET /api/users", async () => {


        //create users and login with each
        await createUsers();
        const auth0 = await login(app, level0User);
        const auth1 = await login(app, level1User);
        const auth2 = await login(app, level2User);
        const auth3 = await login(app, otherCompanyUser);

        //test level0 user get self
        await supertest(app)
            .get("/api/users/me")
            .set('Authorization', 'bearer ' + auth0)
            .expect(200)
            .then(async (response) => {
                expect(response.body).toBeTruthy()
                expect(response.body.first).toBe(level0User.first)
            })

        //test level0 user only can view users in own company
        await supertest(app)
            .get("/api/users")
            .set('Authorization', 'bearer ' + auth0)
            .expect(200)
            .then(async (response) => {
                expect(response.body).toBeTruthy()
                expect(response.body.length).toBe(3)
            })
        
        //test level1 user only can view users in own company
        await supertest(app)
        .get("/api/users")
        .set('Authorization', 'bearer ' + auth1)
        .expect(200)
        .then(async (response) => {
            expect(response.body).toBeTruthy()
            expect(response.body.length).toBe(3)
        })
        
        //test level2 user can view all users
        await supertest(app)
        .get("/api/users")
        .set('Authorization', 'bearer ' + auth2)
        .expect(200)
        .then(async (response) => {
            expect(response.body).toBeTruthy()
            expect(response.body.length).toBe(4)
        })

        //test user of other company
        await supertest(app)
            .get("/api/users")
            .set('Authorization', 'bearer ' + auth3)
            .expect(200)
            .then(async (response) => {
                expect(response.body).toBeTruthy()
                expect(response.body.length).toBe(1)
            })
        
        //test no auth
        await supertest(app)
            .get("/api/users")
            .expect(401)
    });

    test("GET /api/users/:id", async () =>  {
        const { user0, user1, user2, userC } = await createUsers();
        const auth0 = await login(app, level0User);
        const auth1 = await login(app, level1User);
        const auth2 = await login(app, level2User);
        const auth3 = await login(app, otherCompanyUser);

        //test level0 user get level0 user of own company
        await supertest(app)
            .get(`/api/users/${user0.id}`)
            .set('Authorization', 'bearer ' + auth0)
            .expect(200)
            .then(async (response) => {
                expect(response.body).toBeTruthy()
                expect(response.body.first).toBe(user0.first)
            })
        //test level0 user get level2 user of own company
        await supertest(app)
            .get(`/api/users/${user2.id}`)
            .set('Authorization', 'bearer ' + auth0)
            .expect(200)
            .then(async (response) => {
                expect(response.body).toBeTruthy()
                expect(response.body.first).toBe(user2.first)
            })

        //test level1 user get level1 user of own company
        await supertest(app)
            .get(`/api/users/${user1.id}`)
            .set('Authorization', 'bearer ' + auth1)
            .expect(200)
            .then(async (response) => {
                expect(response.body).toBeTruthy()
                expect(response.body.first).toBe(user1.first)
            })
        
        //test level1 user get user from different company
        await supertest(app)
        .get(`/api/users/${userC.id}`)
        .set('Authorization', 'bearer ' + auth1)
        .expect(404)

        //test level2 user get user from different company
        await supertest(app)
        .get(`/api/users/${userC.id}`)
        .set('Authorization', 'bearer ' + auth2)
        .expect(200)
        .then(async (response) => {
            expect(response.body).toBeTruthy()
            expect(response.body.first).toBe(userC.first)
        })
    });

    test("PUT /api/users/:id", async () =>  {
        const { user0, user1, user2, userC } = await createUsers();
        const auth0 = await login(app, level0User);
        const auth1 = await login(app, level1User);
        const auth2 = await login(app, level2User);

        //test level0 cannot modify users
        await supertest(app)
            .put(`/api/users/${user0.id}`)
            .set('Authorization', 'bearer ' + auth0)
            .send({ first: 'put' })
            .expect(403)
            .then( async() => {
                expect(user0.first).toBe(level0User.first)
            })
        
        //test level1 user modifying name of user in same company
        await supertest(app)
        .put(`/api/users/${user0.id}`)
        .set('Authorization', 'bearer ' + auth1)
        .send({ first: 'put1' })
        .expect(200)
        .then(async (response) => {
            expect(response.body).toBeTruthy()
            const euser = await User.findById(user0.id) 
            expect(euser.first).toBe('put1')
        })
        //test level2 user modifying name of user in different company
        await supertest(app)
        .put(`/api/users/${userC.id}`)
        .set('Authorization', 'bearer ' + auth2)
        .send({ first: 'put2' })
        .expect(200)
        .then(async (response) => {
            expect(response.body).toBeTruthy()
            const euser = await User.findById(userC.id) 
            expect(euser.first).toBe('put2')
        })

        //test level1 user modifying user in different company fails
        await supertest(app)
        .put(`/api/users/${userC.id}`)
        .set('Authorization', 'bearer ' + auth1)
        .send({ first: 'put3' })
        .expect(404)
        .then(async () => {
            const euser = await User.findById(userC.id);
            expect(euser.first !== 'put3').toBeTruthy();
        })


    });

    test("DELETE /api/users/:id", async () =>  {
        const { user0, user1, user2, userC } = await createUsers();
        const auth0 = await login(app, level0User);
        const auth1 = await login(app, level1User);
        const auth2 = await login(app, level2User);
        

        //test level0 user cannot delete users
        await supertest(app)
            .delete(`/api/users/${user0.id}`)
            .set('Authorization', 'bearer ' + auth0)
            .expect(403)
            .then( async() => {
                const duser = await User.findById(user0.id);
                expect(duser).toBeTruthy();
            })
        
        //test level1 user cannot delete user of other company
        await supertest(app)
        .delete(`/api/users/${userC.id}`)
        .set('Authorization', 'bearer ' + auth1)
        .expect(404)
        .then( async() => {
            const duser = await User.findById(userC.id);
            expect(duser).toBeTruthy();
        })

        //test level1 user cannot delete user of higher auth
        await supertest(app)
        .delete(`/api/users/${user2.id}`)
        .set('Authorization', 'bearer ' + auth1)
        .expect(403)
        .then( async () => {
            const duser = await User.findById(user2.id);
            expect(duser).toBeTruthy();
        })

        //test level1 user can delete lower auth users 
        await supertest(app)
        .delete(`/api/users/${user0.id}`)
        .set('Authorization', 'bearer ' + auth1)
        .expect(200)
        .then( async (response) => {
            expect(response.body.first).toBe(level0User.first);
            const duser = await User.findById(user0.id);
            expect(duser).toBeFalsy();
        })

        //test level1 user can delete same auth users 
        await supertest(app)
        .delete(`/api/users/${user1.id}`)
        .set('Authorization', 'bearer ' + auth1)
        .expect(200)
        .then( async (response) => {
            expect(response.body.first).toBe(level1User.first);
            const duser = await User.findById(user1.id);
            expect(duser).toBeFalsy();
        })

        //test level2 user can delete user of another company
        await supertest(app)
        .delete(`/api/users/${userC.id}`)
        .set('Authorization', 'bearer ' + auth2)
        .expect(200)
        .then( async (response) => {
            expect(response.body.first).toBe(otherCompanyUser.first);
            const duser = await User.findById(userC.id);
            expect(duser).toBeFalsy();
        })

    })
}
 
 export default testUsers