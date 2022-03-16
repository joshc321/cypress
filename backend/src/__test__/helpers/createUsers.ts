/**
 * @module CreateUsers
 */

 import User from '../../models/user'
 import { level0User, level1User, level2User, otherCompanyUser } from '../model_data/userExamples'

 async function createUsers() {
    const user0 = await User.create(level0User);
    const user1 = await User.create(level1User);
    const user2 = await User.create(level2User);
    const userC = await User.create(otherCompanyUser);
    return { user0, user1, user2, userC }
}


export default createUsers