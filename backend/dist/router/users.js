"use strict";
/**
 @module UsersRoute
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const encryption_1 = require("../helpers/encryption");
const authorization_1 = __importDefault(require("../middleWare/authorization"));
const permissionLevel_1 = __importDefault(require("../middleWare/permissionLevel"));
const router = express_1.default.Router();
router.get('/users', authorization_1.default, (req, res, next) => {
    const body = req.user.permissionLevel == 2 ? {} : { company: req.user.company };
    user_1.default.find(body).then((users) => {
        res.send(users);
    }).catch(next);
});
router.get('/users/:id', authorization_1.default, (req, res, next) => {
    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };
    user_1.default.findOne(body).then((user) => {
        if (user)
            res.send(user);
        else
            res.status(404).send({ 'error': 'User not found' });
    }).catch(next);
});
router.put('/users/:id', authorization_1.default, permissionLevel_1.default, async (req, res, next) => {
    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };
    if ('password' in req.body)
        req.body['password'] = await (0, encryption_1.encryptPassword)(req.body['password']);
    user_1.default.findOneAndUpdate(body, req.body).then(() => {
        user_1.default.findOne({ _id: req.params.id }).then((user) => {
            if (user)
                res.send(user);
            else
                res.status(404).send({ 'error': 'User not found' });
        });
    }).catch(next);
});
router.delete('/users/:id', authorization_1.default, permissionLevel_1.default, (req, res, next) => {
    const body = req.user.permissionLevel == 2 ? { _id: req.params.id } : { _id: req.params.id, company: req.user.company };
    user_1.default.findOneAndDelete(body).then((user) => {
        if (user)
            res.send(user);
        else
            res.status(404).send({ 'error': 'User not found' });
    }).catch(next);
});
exports.default = router;
