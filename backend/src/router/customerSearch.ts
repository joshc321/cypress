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
    let filter : string = req.query.f as string;
    const results = 10;

    if(filter === 'first' || filter === 'last'){}
    else if(filter === 'city' || filter === 'zip'){ filter = 'address.' + filter }
    else {filter = 'last'}

    if(query)
    {
        if(req.user.permissionLevel >= 2)
        {
            Customer.
                find({$text: {$search: query}}).
                sort({ score: { $meta: "textScore" }, filter: 1, "_id": 1 }).
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
                sort({ score: { $meta: "textScore" }, filter: 1, "_id": 1 }).
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
                sort(`${filter} _id`).
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
                sort(`${filter} _id`).
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