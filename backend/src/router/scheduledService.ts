/**
 @module ScheduledServiceRoute
*/

import express from "express";
import ServiceSchedule from "../models/scheduledservice";

//helpers
import authenticateToken from "../middleWare/authorization";
import permissionLevel from "../middleWare/permissionLevel";
import setCompany from "../middleWare/setCompany";

const router = express.Router()


router.post('/serviceschedule', authenticateToken, setCompany,(req, res, next) => {
    ServiceSchedule.create(req.body).then((serviceschedule) =>{
        res.send(serviceschedule);
    })
})

router.get('/serviceschedule', authenticateToken, (req,res,next)=>{
    
    const body = req.user.permissionLevel == 2 ? {} : { company: req.user.company };

    ServiceSchedule.find(body).sort({'date': 1}).then(async (serviceschedules)=>{
        res.send(serviceschedules);
    }).catch(next);
});

router.get('/serviceschedule/:id', authenticateToken, (req,res,next)=>{

    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };

    ServiceSchedule.findOne(body).then(async (serviceschedule) =>{
        if(serviceschedule) res.send(serviceschedule)
        else res.status(404).send({ 'error' : 'Service Schedule not found' })
    }).catch(next);
});

router.put('/serviceschedule/:id', authenticateToken, permissionLevel, async (req,res,next)=>{

    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };

    ServiceSchedule.findOneAndUpdate(body,req.body).then(()=>{
        ServiceSchedule.findOne({_id: req.params.id}).then((serviceschedule)=>{
            if(serviceschedule) res.send(serviceschedule)
            else res.status(404).send({ 'error' : 'Service Schedule not found' })
        });
    }).catch(next);
});

router.delete('/serviceschedule/:id', authenticateToken, permissionLevel, (req,res,next)=>{

    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };

    ServiceSchedule.findOneAndDelete(body).then((serviceschedule)=>{
        if(serviceschedule) res.send(serviceschedule)
        else res.status(404).send({ 'error' : 'Service Schedule not found' })
    }).catch(next);
});

export default router