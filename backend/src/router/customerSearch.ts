/**
 * @CustomerSearchRoute
 */

import express from "express";
import authenticateToken from "../middleWare/authorization";
import Customer from "../models/customer";


const router = express.Router()

router.get('/search/:q', authenticateToken, (req,res,next)=>{
    
    if(req.user.permissionLevel >= 2)
    {
        Customer.
            find({$text: {$search: req.params.q}}).
            then((users)=>{
                console.log(req.params.q)
                res.send(users);
            }).catch(next);
    }
    else
    {
        Customer.
            find({$text: {$search: req.params.q}}).
            where('company').equals(req.user.company).
            then((users)=>{
                res.send(users);
            }).catch(next);
    }
});

export default router