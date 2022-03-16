"use strict";
/**
 @module CustomerRoute
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_1 = __importDefault(require("../models/customer"));
//helpers
const authorization_1 = __importDefault(require("../middleWare/authorization"));
const permissionLevel_1 = __importDefault(require("../middleWare/permissionLevel"));
const setCompany_1 = __importDefault(require("../middleWare/setCompany"));
const router = express_1.default.Router();
router.post('/customer', authorization_1.default, setCompany_1.default, (req, res, next) => {
    customer_1.default.create(req.body).then((customer) => {
        res.send(customer);
    });
});
router.get('/customer', authorization_1.default, (req, res, next) => {
    const body = req.user.permissionLevel == 2 ? {} : { company: req.user.company };
    customer_1.default.find(body).then((customers) => {
        res.send(customers);
    }).catch(next);
});
router.get('/customer/:id', authorization_1.default, (req, res, next) => {
    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };
    customer_1.default.findOne(body).then(async (customer) => {
        if (customer) {
            await customer.populate('services');
            res.send(customer);
        }
        else
            res.status(404).send({ 'error': 'Customer not found' });
    }).catch(next);
});
router.put('/customer/:id', authorization_1.default, permissionLevel_1.default, async (req, res, next) => {
    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };
    customer_1.default.findOneAndUpdate(body, req.body).then(() => {
        customer_1.default.findOne({ _id: req.params.id }).then((customer) => {
            if (customer)
                res.send(customer);
            else
                res.status(404).send({ 'error': 'Customer not found' });
        });
    }).catch(next);
});
router.delete('/customer/:id', authorization_1.default, permissionLevel_1.default, (req, res, next) => {
    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };
    customer_1.default.findOneAndDelete(body).then((customer) => {
        if (customer)
            res.send(customer);
        else
            res.status(404).send({ 'error': 'Customer not found' });
    }).catch(next);
});
exports.default = router;
