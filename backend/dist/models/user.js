"use strict";
/**
 @module User
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_WORK_FACTOR = Number(process.env.SALT_WORK_FACTOR);
const UserSchema = new mongoose_1.Schema({
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
            values: [2, 1, 0],
            message: '{VALUE} is not a supported permissionLevel'
        }
    },
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    password: {
        type: String,
        required: [true, 'Password Field is Required'],
        minlength: 6,
    }
}, {
    timestamps: true
});
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const hashed = await bcrypt_1.default.hash(this.password, SALT_WORK_FACTOR);
    this.password = hashed;
});
UserSchema.methods.encryptPassword = async function (next) {
    const hashed = await bcrypt_1.default.hash(this.password, SALT_WORK_FACTOR);
    this.password = hashed;
    next();
};
UserSchema.methods.validatePassword = async function (pass) {
    const same = await bcrypt_1.default.compare(pass, this.password);
    return same;
};
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
