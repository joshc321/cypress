
import dotenv from "dotenv"
import mongoose from "mongoose"
import supertest from "supertest"

import createServer from './server'



//test scripts imports
import authTest from './routes_test/authT'
import userTest from './routes_test/usersT'
import companyTest from './routes_test/companyT'

dotenv.config()

mongoose.connect(process.env.MONGO_TEST_URI);
mongoose.Promise = global.Promise;

beforeAll((done) => {
	mongoose.connect(
		process.env.MONGO_TEST_URI,
		() => done()
	)
})

afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => done())
})

afterAll((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done())
	})
})

const app = createServer()


// testing

authTest(app);
userTest(app);
companyTest(app);