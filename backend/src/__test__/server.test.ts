
import dotenv from "dotenv"
import mongoose from "mongoose"
import supertest from "supertest"

import createServer from './server'



//test scripts imports
import authTest from './routes_test/authTest'
import userTest from './routes_test/usersTest'
import companyTest from './routes_test/companyTest'

dotenv.config()

mongoose.connect(process.env.MONGO_TEST_URI);
mongoose.Promise = global.Promise;

beforeEach((done) => {
	mongoose.connect(
		process.env.MONGO_TEST_URI,
		() => done()
	)
})

afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done())
	})
})

const app = createServer()


// testing

authTest(app);
userTest(app);
companyTest(app);