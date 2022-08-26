/**
 * @CustomerSearchRoute
 */

import express from "express";
import authenticateToken from "../middleWare/authorization";
import Customer from "../models/customer";


const router = express.Router()

router.get('/search', authenticateToken, (req,res,next)=>{
    const query : string = req.query.q as string;
    const page : number = req.query.page ? req.query.page as unknown as number : 0;
    const results = 10;
    if(query)
    {
        if(req.user.permissionLevel >= 2)
        {
            Customer.
                find({$text: {$search: query}}).
                skip(results * page).
                limit(results).
                then((users)=>{
                    res.send(users);
                }).catch(next);
        }
        else
        {
            Customer.
                find({$text: {$search: query}}).
                where('company').equals(req.user.company).
                skip(results * page).
                limit(results).
                then((users)=>{
                    res.send(users);
                }).catch(next);
        }
    }
    else
    {
        if(req.user.permissionLevel >= 2)
        {
            Customer.
                find().
                skip(results * page).
                limit(results).
                then((users)=>{
                    res.send(users);
                }).catch(next);
        }
        else
        {
            Customer.
                find().
                where('company').equals(req.user.company).
                skip(results * page).
                limit(results).
                then((users)=>{
                    res.send(users);
                }).catch(next);
        }
    }
});

export default router