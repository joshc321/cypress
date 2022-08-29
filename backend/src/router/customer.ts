/**
 @module CustomerRoute
*/

import express from "express";
import Customer from "../models/customer";
import ServiceSchedule from "../models/scheduledservice";

//helpers
import authenticateToken from "../middleWare/authorization";
import permissionLevel from "../middleWare/permissionLevel";
import setCompany from "../middleWare/setCompany";
import moment from "moment";

const router = express.Router()


router.post('/customer', authenticateToken, setCompany,(req, res, next) => {
    Customer.create(req.body).then((customer) =>{
        customer.setNextServiceDate();
        customer.save();
        res.send(customer);
    }).catch(next)
})

router.get('/customer', authenticateToken, (req,res,next)=>{
    
    const body = req.user.permissionLevel >= 2 ? {} : { company: req.user.company };

    Customer.find(body).then((customers)=>{
        res.send(customers);
    }).catch(next);
});

router.get('/customer/:id', authenticateToken, (req,res,next)=>{

    const body = req.user.permissionLevel >= 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };

    Customer.findOne(body).then(async (customer) =>{
        
        if(customer){
            await customer.populate('services')
            await customer.populate({
                path: 'scheduledService',
                match: { date: { $gte: moment().startOf('day').valueOf() } },
                options: { sort: { date: -1 }, limit: 1 },
                select: '_id date -customer'
            })
            res.send(customer)
        }
        else res.status(404).send({ 'error' : 'Customer not found' })
    }).catch(next);
});

router.put('/customer/:id', authenticateToken, permissionLevel, async (req,res,next)=>{

    const body = req.user.permissionLevel >= 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };

    Customer.findOneAndUpdate(body,req.body).then(()=>{
        Customer.findOne(body).then((customer)=>{
            if(customer){
                customer.setNextServiceDate();
                customer.save();
                res.send(customer);
            }
            else res.status(404).send({ 'error' : 'Customer not found' })
        }).catch(next);
    }).catch(next);
});

router.delete('/customer/:id', authenticateToken, permissionLevel, (req,res,next)=>{

    const body = req.user.permissionLevel >= 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };

    Customer.findOneAndDelete(body).then((customer)=>{
        if(customer) res.send(customer)
        else res.status(404).send({ 'error' : 'Customer not found' })
    }).catch(next);
});

export default router