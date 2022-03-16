/**
 @module ServiceRecord
*/

import { Schema, model } from 'mongoose';

interface ServiceRecord {
    date: string;
    address: {
        street: string;
        state: string;
        zip: string;
    };
    service: string;
    notes: string;
    bill: string;
    cost: string;
    company: Schema.Types.ObjectId;
    customer: Schema.Types.ObjectId;
    fullService: boolean;
}

const ServiceRecordSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'Customer Field is Required'],
    },
    fullService: {
        type: Boolean,
        default: true,
        required: [true, 'FullService Field is Required']
    }
},
{
    timestamps: true
});

const ServiceRecord = model('ServiceRecord', ServiceRecordSchema);

export default ServiceRecord;