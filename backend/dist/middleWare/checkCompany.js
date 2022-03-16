"use strict";
/**
 @module CheckCompany
*/
Object.defineProperty(exports, "__esModule", { value: true });
function checkCompany(req, res, next) {
    if (req.user.permissionLevel > 1 || req.params.id == req.user.company)
        next();
    else {
        res.status(401).send({ error: 'Not Authorized' });
    }
}
exports.default = checkCompany;
