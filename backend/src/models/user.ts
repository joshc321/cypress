/**
 @module User
*/

import { NextFunction } from "express";
import mongoose, { Schema, model } from 'mongoose';
import bcrypt from "bcrypt";

interface User extends mongoose.Document {
    first: string;
    last: string;
    email: string;
    permissionLevel: Number,
    company: Schema.Types.ObjectId;
    password: string;
    validatePassword: Function;
    encryptPassword: Function;
}

const SALT_WORK_FACTOR = Number(process.env.SALT_WORK_FACTOR)

const UserSchema = new Schema({
    first: {
        type: String,
        required: [true, 'First Field is Required'],
        maxlength: 50,
    },
    last: {
        type: String,
        required: [true, 'Last Field is Required'],
        maxLength: 50,
    },
    email: {
        type: String,
        unique: [true, 'Email Field must be unique'],
    },
    permissionLevel: {
        type: Number,
        required: [true, 'PermissionLevel Field is Required'],
        default: 0,
        enum: {
            values: [2,1,0],
            message: '{VALUE} is not a supported permissionLevel'
            }
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    password: {
        type: String,
        required: [true, 'Password Field is Required'],
        minlength: 6,
    }
},
{
    timestamps: true
});

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    const hashed = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    this.password = hashed;
})

UserSchema.methods.encryptPassword = async function(next: NextFunction){
    const hashed = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    this.password = hashed;
    next();
};

UserSchema.methods.validatePassword = async function(pass: string) {
    const same = await bcrypt.compare(pass, this.password);
    return same;
};

const User = model<User>('User', UserSchema);

export default User;