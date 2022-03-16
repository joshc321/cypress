"use strict";
/**
 @module Customer
*/
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
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
        maxlength: 15,
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
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
CustomerSchema.virtual('services', {
    ref: 'ServiceRecord',
    localField: '_id',
    foreignField: 'customer'
});
CustomerSchema.pre('save', async function (next) {
});
CustomerSchema.methods.encryptPassword = async function (next) {
};
const Customer = (0, mongoose_1.model)('Customer', CustomerSchema);
exports.default = Customer;
