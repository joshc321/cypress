/**
 @module Company
*/

import mongoose, { Schema, model } from 'mongoose';

interface Company extends mongoose.Document {
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

const Company = model<Company>('Company', CompanySchema);

export default Company;