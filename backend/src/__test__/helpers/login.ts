/**
 * @module Login
 */

import request from 'supertest'

async function login(app, user) {
    let auth = null
    await request(app)
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