/**
 @module ScheduledServiceRoute
*/

import express from "express";
import ServiceSchedule from "../models/scheduledservice";
import Customer from "../models/customer";

//helpers
import authenticateToken from "../middleWare/authorization";
import permissionLevel from "../middleWare/permissionLevel";
import setCompany from "../middleWare/setCompany";

const router = express.Router()

router.post('/serviceschedule', authenticateToken, setCompany,(req, res, next) => {
    ServiceSchedule.create(req.body).then((serviceschedule) =>{
        Customer.findById(serviceschedule.customer).then((customer) => {
            if(customer)
            {
                customer._serviceDate = serviceschedule.date;
                customer.save()
                res.send(serviceschedule);
            }
        }).catch(next);
    }).catch(next);
})

router.post('/serviceschedule/s', authenticateToken, (req,res,next)=>{
    
    const body = req.user.permissionLevel >= 2 ? {} : { company: req.user.company };
    ServiceSchedule.find(body).where('date').gt(req.body.gt).lt(req.body.lt).sort('date').then((serviceschedules)=>{
        res.send(serviceschedules);
    }).catch(next);
});

router.get('/serviceschedule/:id', authenticateToken, (req,res,next)=>{

    const body = req.user.permissionLevel >= 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };

    ServiceSchedule.findOne(body).then(async (serviceschedule) =>{
        if(serviceschedule) res.send(serviceschedule)
        else res.status(404).send({ 'error' : 'Service Schedule not found' })
    }).catch(next);
});

router.put('/serviceschedule/:id', authenticateToken, permissionLevel, async (req,res,next)=>{

    const body = req.user.permissionLevel >= 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };

    ServiceSchedule.findOneAndUpdate(body,req.body).then(()=>{
        ServiceSchedule.findOne(body).then((serviceschedule)=>{
            
            if(serviceschedule)
            {
                Customer.findById(serviceschedule.customer).then((customer) => {
                    if(customer)
                    {
                        customer._serviceDate = serviceschedule.date;
                        customer.save()
                        res.send(serviceschedule);
                    }
                }).catch(next);
            }
            else res.status(404).send({ 'error' : 'Service Schedule not found' })
        }).catch(next);
    }).catch(next);
});

router.delete('/serviceschedule/:id', authenticateToken, permissionLevel, (req,res,next)=>{

    const body = req.user.permissionLevel >= 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };

    ServiceSchedule.findOneAndDelete(body).then((serviceschedule)=>{
        if(serviceschedule) res.send(serviceschedule)
        else res.status(404).send({ 'error' : 'Service Schedule not found' })
    }).catch(next);
});

export default router