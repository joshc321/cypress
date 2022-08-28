/**
 @module CompanyRoute
*/

import express from "express";
import Company from "../models/company";

import authenticateToken from "../middleWare/authorization";
import checkCompany from "../middleWare/checkCompany";
import permissionLevel from "../middleWare/permissionLevel";
import adminPermissionLevel from "../middleWare/adminPermissionLevel";

const router = express.Router()


router.post('/company', authenticateToken, adminPermissionLevel, (req,res,next)=>{
    Company.create(req.body).then((company)=>{
        res.send(company);
    }).catch(next);
});

router.get('/company/:id', authenticateToken, checkCompany, (req,res,next)=>{
    Company.findById({_id: req.params.id}).then((company) =>{
        if(!company) res.status(404).send({ 'error': 'Company not found' });
        else res.send(company);
    }).catch(next);
});

router.put('/company/:id',authenticateToken, permissionLevel, checkCompany, async (req,res,next)=>{
    Company.findOneAndUpdate({_id:
    req.params.id},req.body).then(()=>{
        Company.findOne({_id: req.params.id}).then((company)=>{
            if(!company) res.status(404).send({ 'error': 'Company not found' });
            else res.send(company);
        }).catch(next);
    }).catch(next);
});

router.delete('/company/:id', authenticateToken, permissionLevel, checkCompany,(req,res,next)=>{
    Company.findOneAndDelete({_id: req.params.id}).then((company)=>{
        if(!company) res.status(404).send({ 'error': 'Company not found' });
        else res.send(company);
    }).catch(next);
});

export default router