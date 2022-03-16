"use strict";
/**
 @module Company
*/
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CompanySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name Field is Required'],
        maxlength: 50,
    },
    active: {
        type: Boolean,
        required: [true, 'Active Field is Required'],
        default: false
    }
}, {
    timestamps: true
});
const Company = (0, mongoose_1.model)('Company', CompanySchema);
exports.default = Company;
