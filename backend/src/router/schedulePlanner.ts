/**
 @module schedulePlannerRoute
*/

import express from "express";
import Customer from "../models/customer";

//helpers
import authenticateToken from "../middleWare/authorization";
import moment from "moment";

const router = express.Router()


router.get('/scheduleplanner', authenticateToken, (req,res,next)=>{
    
    const body = req.user.permissionLevel == 2 ? { active: true, straggler: false } : { company: req.user.company, active: true, straggler: false };
    const month : string = req.query.month ? req.query.month as string : (moment().month()+1).toString();
    const year : string = req.query.year ? req.query.year as unknown as string : (moment().year()).toString();
    const date = moment(year+'-0'+month)
    Customer.find(body).where('nextService').gt(date.startOf('month').valueOf()).lt(date.endOf('month').valueOf()).sort('nextService').then((customers)=>{
        res.send(customers);
    }).catch(next);
});

router.get('/stragglers', authenticateToken, (req,res,next)=>{
    
    const body = req.user.permissionLevel == 2 ? { active: true, straggler: true } : { company: req.user.company, active: true, straggler: true };

    Customer.find(body).sort('nextService').then((customers)=>{
        res.send(customers);
    }).catch(next);
});


export default router