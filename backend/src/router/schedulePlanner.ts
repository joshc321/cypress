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
    const month  = req.query.month ? req.query.month : (moment().month()+1).toString();
    const year = req.query.year ? req.query.year : (moment().year()).toString();
    let join: string = '-'
    if(typeof month !== 'string' && (month.length === 0 || month.length === 1)) res.status(422).send({ 'error' : 'Invalid month format' })
    if(typeof year !== 'string' && year.length === 4) res.status(422).send({ 'error' : 'Invalid year format' })
    if(month.length === 1) join = '-0'
    var date;
    try{
        date = moment(year+join+month)
    }
    catch (error)
    {
        date = moment()
        res.status(422).send({'error': 'Invalid date year formate'})
    }
    Customer.find(body)
          .where('nextService').gt(date.startOf('month').valueOf()).lt(date.endOf('month').valueOf())
          .where('_serviceDate').lt(date.startOf('month').valueOf())
          .sort('nextService').then((customers)=>{
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