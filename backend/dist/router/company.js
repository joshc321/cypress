"use strict";
/**
 @module CompanyRoute
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_1 = __importDefault(require("../models/company"));
const authorization_1 = __importDefault(require("../middleWare/authorization"));
const checkCompany_1 = __importDefault(require("../middleWare/checkCompany"));
const permissionLevel_1 = __importDefault(require("../middleWare/permissionLevel"));
const router = express_1.default.Router();
router.post('/company', (req, res, next) => {
    company_1.default.create(req.body).then((company) => {
        res.send(company);
    }).catch(next);
});
router.get('/company/:id', authorization_1.default, checkCompany_1.default, (req, res, next) => {
    company_1.default.findById({ _id: req.params.id }).then((company) => {
        if (!company)
            res.status(404).send({ 'error': 'Company not found' });
        else
            res.send(company);
    }).catch(next);
});
router.put('/company/:id', authorization_1.default, permissionLevel_1.default, checkCompany_1.default, async (req, res, next) => {
    company_1.default.findOneAndUpdate({ _id: req.params.id }, req.body).then(() => {
        company_1.default.findOne({ _id: req.params.id }).then((company) => {
            if (!company)
                res.status(404).send({ 'error': 'Company not found' });
            else
                res.send(company);
        });
    }).catch(next);
});
router.delete('/company/:id', authorization_1.default, permissionLevel_1.default, checkCompany_1.default, (req, res, next) => {
    company_1.default.findOneAndDelete({ _id: req.params.id }).then((company) => {
        if (!company)
            res.status(404).send({ 'error': 'Company not found' });
        else
            res.send(company);
    }).catch(next);
});
exports.default = router;
