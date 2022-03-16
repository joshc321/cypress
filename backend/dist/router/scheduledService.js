"use strict";
/**
 @module ScheduledServiceRoute
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scheduledservice_1 = __importDefault(require("../models/scheduledservice"));
//helpers
const authorization_1 = __importDefault(require("../middleWare/authorization"));
const permissionLevel_1 = __importDefault(require("../middleWare/permissionLevel"));
const setCompany_1 = __importDefault(require("../middleWare/setCompany"));
const router = express_1.default.Router();
router.post('/serviceschedule', authorization_1.default, setCompany_1.default, (req, res, next) => {
    scheduledservice_1.default.create(req.body).then((serviceschedule) => {
        res.send(serviceschedule);
    });
});
router.get('/serviceschedule', authorization_1.default, (req, res, next) => {
    const body = req.user.permissionLevel == 2 ? {} : { company: req.user.company };
    scheduledservice_1.default.find(body).sort({ 'date': 1 }).then(async (serviceschedules) => {
        res.send(serviceschedules);
    }).catch(next);
});
router.get('/serviceschedule/:id', authorization_1.default, (req, res, next) => {
    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };
    scheduledservice_1.default.findOne(body).then(async (serviceschedule) => {
        if (serviceschedule)
            res.send(serviceschedule);
        else
            res.status(404).send({ 'error': 'Service Schedule not found' });
    }).catch(next);
});
router.put('/serviceschedule/:id', authorization_1.default, permissionLevel_1.default, async (req, res, next) => {
    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };
    scheduledservice_1.default.findOneAndUpdate(body, req.body).then(() => {
        scheduledservice_1.default.findOne({ _id: req.params.id }).then((serviceschedule) => {
            if (serviceschedule)
                res.send(serviceschedule);
            else
                res.status(404).send({ 'error': 'Service Schedule not found' });
        });
    }).catch(next);
});
router.delete('/serviceschedule/:id', authorization_1.default, permissionLevel_1.default, (req, res, next) => {
    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };
    scheduledservice_1.default.findOneAndDelete(body).then((serviceschedule) => {
        if (serviceschedule)
            res.send(serviceschedule);
        else
            res.status(404).send({ 'error': 'Service Schedule not found' });
    }).catch(next);
});
exports.default = router;
