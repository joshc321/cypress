/**
 @module CustomerRoute
*/

import express from "express";
import multer from "multer";
import Customer from "../models/customer";

//helpers
import authenticateToken from "../middleWare/authorization";
import permissionLevel from "../middleWare/permissionLevel";
import setCompany from "../middleWare/setCompany";
import moment from "moment";
import adminPermissionLevel from "../middleWare/adminPermissionLevel";

const router = express.Router()
const upload = multer({});

router.post('/customer', authenticateToken, setCompany,(req, res, next) => {
    Customer.create(req.body).then((customer) =>{
        customer.setNextServiceDate();
        customer.save();
        res.send(customer);
    }).catch(next)
})

router.post('/customer/many', authenticateToken, adminPermissionLevel, upload.single('file'), (req,res,next) => {

    const data = JSON.stringify(req.file);
    const js = JSON.parse(data);
    if(js.size > 2 * 2024 * 1024)
    {
        res.status(413).send({'error' : 'File must be less than 2MB'});
        return;
    }
        

    const buf = Buffer.from(js.buffer.data).toString();
    const jsb = JSON.parse(buf);
    if(!("data" in jsb))
    {
        res.status(422).send({'error': 'Invalid File Format'});
        return;
    }
    Customer.insertMany(jsb.data).then((customers) => {
        customers.map( async (customer) => {
            await customer.setNextServiceDate();
            await customer.save();
        });
        res.send({'data': 'updated successfully'});
    }).catch(next);
});

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
            await customer.populate({
                path: 'services',
                options: { sort: { date: -1 } }
            })
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