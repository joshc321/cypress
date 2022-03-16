/**
 @module ServiceRecordRoute
*/

import express from "express";
import ServiceRecord from "../models/servicerecord";

//helpers
import authenticateToken from "../middleWare/authorization";
import permissionLevel from "../middleWare/permissionLevel";
import setCompany from "../middleWare/setCompany";

const router = express.Router()


router.post('/servicerecord', authenticateToken, setCompany,(req, res, next) => {
    ServiceRecord.create(req.body).then((servicerecord) =>{
        res.send(servicerecord);
    })
})

router.get('/servicerecord', authenticateToken, (req,res,next)=>{
    
    const body = req.user.permissionLevel == 2 ? {} : { company: req.user.company };

    ServiceRecord.find(body).then((servicerecord)=>{
        res.send(servicerecord);
    }).catch(next);
});

router.get('/servicerecord/:id', authenticateToken, (req,res,next)=>{

    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };

    ServiceRecord.findOne(body).then((servicerecord) =>{
        if(servicerecord) res.send(servicerecord)
        else res.status(404).send({ 'error' : 'Service Record not found' })
    }).catch(next);
});

router.put('/servicerecord/:id', authenticateToken, permissionLevel, async (req,res,next)=>{

    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };

    ServiceRecord.findOneAndUpdate(body,req.body).then(()=>{
        ServiceRecord.findOne(body).then((servicerecord)=>{
            if(servicerecord) res.send(servicerecord)
            else res.status(404).send({ 'error' : 'Service Record not found' })
        });
    }).catch(next);
});

router.delete('/servicerecord/:id', authenticateToken, permissionLevel, (req,res,next)=>{

    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };

    ServiceRecord.findOneAndDelete(body).then((servicerecord)=>{
        if(servicerecord) res.send(servicerecord)
        else res.status(404).send({ 'error' : 'Service Record not found' })
    }).catch(next);
});

export default router