"use strict";
/**
 @module createServer
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
console.log('Starting Server...');
//load env
dotenv_1.default.config();
const users_1 = __importDefault(require("../router/users"));
const auth_1 = __importDefault(require("../router/auth"));
const company_1 = __importDefault(require("../router/company"));
function createServer() {
    const app = (0, express_1.default)();
    app.use(express_1.default.static('public'));
    app.use(express_1.default.json());
    // Define Custom Routes
    app.use('/api', auth_1.default);
    app.use('/api', users_1.default);
    app.use('/api', company_1.default);
    app.use((req, res, next) => {
        res.status(404).send({ error: 'not found' });
    });
    app.use((err, req, res, next) => {
        res.status(422).send({ error: err.message });
    });
    return app;
}
exports.default = createServer;
