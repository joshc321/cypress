/**
 * @module FirstUserCreation
 */

import User from '../models/user'
import Company from '../models/company'

import prompts from 'prompts'

const adminCompany = {
    name: "Cypress",
    active: true,
}

interface admin {
    first: string;
    last: string;
    email: string;
    password: string;
}

const questions = [
    {
        type: 'text',
        name: 'first',
        message: 'First name'
    },
    {
        type: 'text',
        name: 'last',
        message: 'Last name'
    },
    {
        type: 'text',
        name: 'email',
        message: 'email'
    },
    {
        type: 'text',
        name: 'password',
        message: 'password',
        validate: password => password.length < 6 ? 'Password must be at least 6 characters' : true
    }
];

const run = () => {
    console.log("-----------------------------------------------");
    console.log("|            Cypress Initial Setup            |");
    console.log("-----------------------------------------------\n");
    console.log("Please Input initial admin account details below");
    
    prompts(questions).then((response: admin) => {
        console.log("User Info:")
        console.log("Company: ", adminCompany.name);
        console.log("First: ", response.first);
        console.log("Last: ", response.last);
        console.log("Email: ", response.email);
        console.log("Password: ", response.password);

        const admin = 
        {
            first: response.first,
            last: response.last,
            email: response.email,
            permissionLevel: 2,
            company: null,
            password: response.password,
        }

        Company.create(adminCompany).then((comp) => {
            admin.company = comp._id;
            User.create(admin);
        })

        console.log("-----------------------------------------------");
        console.log("|        Cypress Initial Setup Complete       |");
        console.log("-----------------------------------------------\n");

        console.log("server started...")

    })
}

const CreateFirstUser =  () => {

    User.estimatedDocumentCount().then(count =>{
        if(count === 0)
        {
            run()
        }
    })
    .catch(err => {
        console.log(err);
        run();
    })
}

export default CreateFirstUser;

