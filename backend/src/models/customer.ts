/**
 @module Customer
*/

import { Schema, model } from 'mongoose';
import { NextFunction } from 'express';

import addToDate from '../helpers/addToDate'

interface Customer {
    first: string;
    last: string;
    phone: string;
    address: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    system: string;
    notes: string;
    email: string;
    company: Schema.Types.ObjectId;
    lastServiced: Date;
    serviceInterval: {
        duration: Number;
        unit: String;
    };
    straggler: boolean;
    active: boolean;
}

const CustomerSchema = new Schema({
    first: {
        type: String,
        required: [true, 'First Field is Required'],
        maxlength: 63,
    },
    last: {
        type: String,
        required: [true, 'Last Field is Required'],
        maxLength: 63,
    },
    phone: {
        type: String,
        maxlength: 31,
    },
    address: {
        street: {
            type: String,
            maxlength: 255,
        },
        city: {
            type: String,
            maxlength: 31,
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
    system: {
        type: String,
        maxlength: 1023,
    },
    notes: {
        type: String,
        maxlength: 1023,
    },
    email: {
        type: String,
        maxlength: 127,
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    lastServiced: {
        type: Date,
        required: true,
        default: Date.now
    },
    serviceInterval: {
        duration: {
            type: Number,
            required: [true, 'serviceInterval.duration Field is Required'],
            default: 1,
            min: 0
        },
        unit: {
            type: String,
            required: [true, 'serviceInterval.unit Field is Required'],
            default: 'years',
            enum: {
                values: ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds', 'y', 'M', 'w', 'd', 'h', 'm', 's', 'ms'],
                message: '{VALUE} is not a supported unit'
              }
        }
    },
    nextService: {
        type: Date,
        required: true,
        default: Date.now
    },
    straggler: {
        type: Boolean,
        default: false,
        required: [true, 'Straggler Field is Required']
    },
    active: {
        type: Boolean,
        default: true,
        required: [true, 'Active Field is Required']
    }
},
{
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }
});

CustomerSchema.index({'$**': 'text'});

CustomerSchema.virtual('services', {
    ref: 'ServiceRecord',
    localField: '_id',
    foreignField: 'customer'
});

CustomerSchema.virtual('scheduledService', {
    ref: 'ServiceSchedule',
    localField: '_id',
    foreignField: 'customer',
    justOne : true,
});

CustomerSchema.pre('save', async function(next){
    if(!this.isModified('lastService') && !this.isModified('serviceInterval.duration') && !this.isModified('serviceInterval.unit')) return next();
    this.nextService = addToDate(this.lastService, this.serviceInterval.duration, this.serviceInterval.unit)
})

CustomerSchema.methods.setNextServiceDate = async function(next: NextFunction){
    this.nextService = addToDate(this.lastService, this.serviceInterval.duration, this.serviceInterval.unit);
    next
};

const Customer = model('Customer', CustomerSchema);

export default Customer;