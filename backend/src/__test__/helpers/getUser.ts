/**
 * @GetUser
 */

import User from "../../models/user";


async function getUser(body)
{
    const user = await User.findOne(body);
    return user;
}

export default getUser;