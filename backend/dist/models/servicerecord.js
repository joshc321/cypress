"use strict";
/**
 @module ServiceRecord
*/
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ServiceRecordSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    address: {
        street: {
            type: String,
            maxlength: 255,
        },
        state: {
            type: String,
            maxlength: 31,
        },
        zip: {
            type: String,
            maxlength: 15,
        }
    },
    service: {
        type: String,
        maxlength: 1023,
    },
    notes: {
        type: String,
        maxlength: 1023,
    },
    bill: {
        type: String,
        maxlength: 20
    },
    cost: {
        type: String,
        maxlength: 20
    },
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'Customer Field is Required'],
    },
    fullService: {
        type: Boolean,
        default: true,
        required: [true, 'FullService Field is Required']
    }
}, {
    timestamps: true
});
const ServiceRecord = (0, mongoose_1.model)('ServiceRecord', ServiceRecordSchema);
exports.default = ServiceRecord;
