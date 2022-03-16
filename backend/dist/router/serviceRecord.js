"use strict";
/**
 @module ServiceRecordRoute
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const servicerecord_1 = __importDefault(require("../models/servicerecord"));
//helpers
const authorization_1 = __importDefault(require("../middleWare/authorization"));
const permissionLevel_1 = __importDefault(require("../middleWare/permissionLevel"));
const setCompany_1 = __importDefault(require("../middleWare/setCompany"));
const router = express_1.default.Router();
router.post('/servicerecord', authorization_1.default, setCompany_1.default, (req, res, next) => {
    servicerecord_1.default.create(req.body).then((servicerecord) => {
        res.send(servicerecord);
    });
});
router.get('/servicerecord', authorization_1.default, (req, res, next) => {
    const body = req.user.permissionLevel == 2 ? {} : { company: req.user.company };
    servicerecord_1.default.find(body).then((servicerecord) => {
        res.send(servicerecord);
    }).catch(next);
});
router.get('/servicerecord/:id', authorization_1.default, (req, res, next) => {
    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };
    servicerecord_1.default.findOne(body).then((servicerecord) => {
        if (servicerecord)
            res.send(servicerecord);
        else
            res.status(404).send({ 'error': 'Service Record not found' });
    }).catch(next);
});
router.put('/servicerecord/:id', authorization_1.default, permissionLevel_1.default, async (req, res, next) => {
    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };
    servicerecord_1.default.findOneAndUpdate(body, req.body).then(() => {
        servicerecord_1.default.findOne({ _id: req.params.id }).then((servicerecord) => {
            if (servicerecord)
                res.send(servicerecord);
            else
                res.status(404).send({ 'error': 'Service Record not found' });
        });
    }).catch(next);
});
router.delete('/servicerecord/:id', authorization_1.default, permissionLevel_1.default, (req, res, next) => {
    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };
    servicerecord_1.default.findOneAndDelete(body).then((servicerecord) => {
        if (servicerecord)
            res.send(servicerecord);
        else
            res.status(404).send({ 'error': 'Service Record not found' });
    }).catch(next);
});
exports.default = router;
