/**
 * @module Login
 */

import supertest from 'supertest'

async function login(app, user) {
    let auth = null
    await supertest(app)
        .post("/api/login")
        .send(user)
        .expect(200)
        .then(async (response) => {
            expect(response.body.token).toBeTruthy();
            auth = response.body.token
        })
    return auth
}   

export default login