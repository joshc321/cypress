/**
 @module UsersRoute
*/

import express from "express";
import User from "../models/user"

import { encryptPassword } from "../helpers/encryption";
import authenticateToken from "../middleWare/authorization";
import permissionLevel from "../middleWare/permissionLevel";

const router = express.Router()

router.get('/users', authenticateToken, (req,res,next)=>{
    
    const body = req.user.permissionLevel == 2 ? {} : { company: req.user.company };

    User.find(body).then((users)=>{
        res.send(users);
    }).catch(next);
});

router.get('/users/:id', authenticateToken, (req,res,next)=>{

    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };

    User.findOne(body).then((user) =>{
        if(user) res.send(user)
        else res.status(404).send({ 'error' : 'User not found' })
    }).catch(next);
});

router.put('/users/:id', authenticateToken, permissionLevel, async (req,res,next)=>{

    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };

    if('password' in req.body) req.body['password'] = await encryptPassword(req.body['password']);
    User.findOneAndUpdate(body,req.body).then(()=>{
        User.findOne(body).then((user)=>{
            if(user) res.send(user)
            else res.status(404).send({ 'error' : 'User not found' })
        });
    }).catch(next);
});

router.delete('/users/:id', authenticateToken, permissionLevel, (req,res,next)=>{

    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };

    User.findOne(body).then((user)=>{
        if(!user) res.status(404).send({ 'error' : 'User not found' })
        else if(user.permissionLevel > req.user.permissionLevel) res.status(403).send({ 'error' : 'Not Authorized' })
        else{
            User.findOneAndDelete(body).then((user)=>{
                res.send(user)
            })
        }
    }).catch(next);
});

export default router