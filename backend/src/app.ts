import express  from 'express'
import dotenv   from "dotenv"
import mongoose from "mongoose"

console.log('Starting Server...')

//load env
dotenv.config()

import usersRoute            from './router/users'
import authRoute             from './router/auth'
import companyRoute          from './router/company'
import customerRoute         from './router/customer'
import serviceRecordRoute    from './router/serviceRecord'
import scheduledServiceRoute from './router/scheduledService'

const app = express();

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(express.json());

// Define Custom Routes
app.use('/api',authRoute);
app.use('/api',usersRoute);
app.use('/api', companyRoute);
app.use('/api', customerRoute);
app.use('/api', serviceRecordRoute);
app.use('/api', scheduledServiceRoute);

app.use((req, res, next)=>{
  res.status(404).send({error: 'not found'});
})

app.use((err,req,res,next)=>{
    res.status(422).send({error: err.message});
})

app.listen(process.env.port, () =>{
    console.log(`server started on port ${process.env.port}`);
})