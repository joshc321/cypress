"use strict";
/**
 @module AuthRoute
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const authorization_1 = __importDefault(require("../middleWare/authorization"));
const permissionLevel_1 = __importDefault(require("../middleWare/permissionLevel"));
const setCompany_1 = __importDefault(require("../middleWare/setCompany"));
const encryption_1 = require("../helpers/encryption");
const router = express_1.default.Router();
router.post('/newuser', authorization_1.default, permissionLevel_1.default, setCompany_1.default, (req, res, next) => {
    user_1.default.create(req.body).then((user) => {
        res.send(user);
    }).catch(next);
});
router.post('/login', (req, res, next) => {
    user_1.default.findOne({ email: req.body.email }).then(async (user) => {
        if (user && await user.validatePassword(req.body.password)) {
            const token = (0, encryption_1.generateAccessToken)({ id: user._id, permissionLevel: user.permissionLevel, company: user.company });
            res.send({ user, token: token });
        }
        else {
            res.status(404).send({ error: 'Invalid Login' });
        }
    }).catch(next);
});
exports.default = router;
