"use strict";
/**
 @module ServiceSchedule
*/
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ServiceScheduleSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    service: {
        type: String,
        maxlength: 1023,
    },
    notes: {
        type: String,
        maxlength: 1023,
    },
    estimate: {
        type: String,
        maxlength: 63,
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
        autopopulate: true
    }
}, {
    timestamps: true,
});
ServiceScheduleSchema.plugin(require('mongoose-autopopulate'));
const ServiceSchedule = (0, mongoose_1.model)('ServiceSchedule', ServiceScheduleSchema);
exports.default = ServiceSchedule;
