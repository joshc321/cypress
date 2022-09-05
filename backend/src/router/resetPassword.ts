/**
 @module resetPasswordRoute
*/

import express from "express";
import { generatePasswordToken, decodeToken } from "../helpers/encryption";
import sendEmail from "../helpers/sendEmail";
import User from "../models/user";

//helpers

const router = express.Router()

router.post('/forgot', (req,res,next) => {
    const origin = req.get('origin')
    User.findOne({}).where('email').equals(req.body.email)
        .then((user) => {
            if(user)
            {
                const resetToken = generatePasswordToken({_id: user._id})
                // send email to user
                const url = `${origin}/reset/${resetToken}`
                sendEmail(user.email, 'Cypress Reset Password', url, `<a href='${url}'>Reset Password</a>`)
            }
            res.send({ message: 'Email sent to user if valid email' })
        }).catch(next)
})

router.post('/reset', (req,res,next) => {
    const data = decodeToken(req.body.resetToken)
    if(!data._id || !req.body.password) res.status(401).send({ error: 'Invalid Access Token' })
    else
    {
        User.findById(data._id)
            .then(async (user) => {
                if(user)
                {
                    user.password = req.body.password;
                    await user.save();
                    res.send({ message: 'Password reset' })
                }
                else
                {
                    res.status(401).send({ message: 'Invalid Access Token' })
                }
            }).catch(next)
    }
})

export default router;