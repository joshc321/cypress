/**
 @module Company
*/

import { Schema, model } from 'mongoose';

interface Company {
    name: string;
    active: boolean;
}

const CompanySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name Field is Required'],
        maxlength: 50,
    },
    active: {
        type: Boolean,
        required: [true, 'Active Field is Required'],
        default: true
    }
},
{
    timestamps: true
});

const Company = model('Company', CompanySchema);

export default Company;