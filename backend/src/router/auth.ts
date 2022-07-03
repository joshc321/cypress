/**
 @module AuthRoute
*/

import express from "express";
import User from "../models/user"

import authenticateToken from "../middleWare/authorization";
import permissionLevel from "../middleWare/permissionLevel";
import setCompany from "../middleWare/setCompany";

import { generateAccessToken } from "../helpers/encryption";

const router = express.Router()

router.post('/newuser', authenticateToken, permissionLevel, setCompany, (req,res,next)=>{
    User.create(req.body).then((user)=>{
        res.send(user);
    }).catch(next);
});

router.post('/login', (req,res,next)=>{
    User.findOne({ email: req.body.email }).then( async (user)=>{
        if(user && await user.validatePassword(req.body.password)){
            const token = generateAccessToken({id: user._id, permissionLevel: user.permissionLevel, company: user.company});
            res.send({user, token: token});
        }
        else{
            res.status(401).send({error: 'Invalid Login'});
        }
    }).catch(next);
});

export default router