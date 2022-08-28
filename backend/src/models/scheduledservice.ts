/**
 @module ServiceSchedule
*/

import { Schema, model } from 'mongoose';

interface ServiceSchedule {
    date: Date;
    service: string;
    notes: string;
    estimate: string,
    company: Schema.Types.ObjectId;
    customer: Schema.Types.ObjectId;
}

const ServiceScheduleSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'Customer Field is Required'],
        autopopulate: { maxDepth: 0 }
    }
},
{
    timestamps: true,
});

ServiceScheduleSchema.plugin(require('mongoose-autopopulate'));


const ServiceSchedule = model('ServiceSchedule', ServiceScheduleSchema);

export default ServiceSchedule;