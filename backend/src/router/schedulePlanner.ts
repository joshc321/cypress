/**
 @module schedulePlannerRoute
*/

import express from "express";
import Customer from "../models/customer";

//helpers
import authenticateToken from "../middleWare/authorization";

const router = express.Router()


router.get('/scheduleplanner', authenticateToken, (req,res,next)=>{
    
    const body = req.user.permissionLevel == 2 ? { active: true, straggler: false } : { company: req.user.company, active: true, straggler: false };

    Customer.find(body).sort('nextService').then((customers)=>{
        res.send(customers);
    }).catch(next);
});


export default router