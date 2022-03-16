/**
 @module createServer
*/


import express from 'express'
import dotenv from "dotenv"

console.log('Starting Server...')

//load env
dotenv.config()

import usersRoute from '../router/users'
import authRoute from '../router/auth'
import companyRoute from '../router/company'

function createServer() {
    const app = express();

    app.use(express.static('public'));

    app.use(express.json());

    // Define Custom Routes
    app.use('/api',authRoute);
    app.use('/api',usersRoute);
    app.use('/api', companyRoute);

    app.use((req, res, next)=>{
    res.status(404).send({error: 'not found'});
    })

    app.use((err,req,res,next)=>{
        res.status(422).send({error: err.message});
    })

    return app
}

export default createServer