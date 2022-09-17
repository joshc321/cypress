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
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '30d' });
}

function generatePasswordToken(payload: object) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '300s' })
}

function decodeToken(token) {
    return jwt.verify(token, process.env.SECRET_KEY)
}

export { encryptPassword, checkPassword, generateAccessToken, generatePasswordToken, decodeToken } 