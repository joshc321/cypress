/**
 @module EncryptionHelper
*/

import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken'

async function encryptPassword(password: string){
    return await bcrypt.hash(password, Number(process.env.SALT_WORK_FACTOR)); 
};

async function checkPassword(plainPassword: string, encryptedPassword: string) {
    return await bcrypt.compare(encryptedPassword, plainPassword);
};

function generateAccessToken(payload: object) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1800s' });
}

export { encryptPassword, checkPassword, generateAccessToken } 