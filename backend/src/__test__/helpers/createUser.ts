/**
 * @module CreateUsers
 */

 import User from '../../models/user'

 async function createUser(body) {
    const user = await User.create(body);
    return user
}


export default createUser