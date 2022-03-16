"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("./server"));
const user_examples_1 = require("./model_data/user_examples");
const user_1 = __importDefault(require("../models/user"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGO_TEST_URI);
mongoose_1.default.Promise = global.Promise;
beforeEach((done) => {
    mongoose_1.default.connect(process.env.MONGO_TEST_URI, () => done());
});
afterEach((done) => {
    mongoose_1.default.connection.db.dropDatabase(() => {
        mongoose_1.default.connection.close(() => done());
    });
});
const app = (0, server_1.default)();
// auth testing
test("POST /login", async () => {
    const user = await user_1.default.create(user_examples_1.level1User);
    const data = user_examples_1.level1User;
    //login
    await (0, supertest_1.default)(app)
        .post("/api/login")
        .send(data)
        .expect(200)
        .then(async (response) => {
        // Check the response type and length
        expect(response.body.user.first).toBe(user.first);
        expect(response.body.user.email).toBe(user.email);
        expect(response.body.user.password).toBe(user.password);
        expect(response.body.token).toBeTruthy();
    });
});
test("POST /newuser", async () => {
    let authToken = null;
    const user = await user_1.default.create(user_examples_1.level1User);
    const data = user_examples_1.level1User;
    //login
    await (0, supertest_1.default)(app)
        .post("/api/login")
        .send(data)
        .expect(200)
        .then(async (response) => {
        expect(response.body.user.first).toBe(user.first);
        expect(response.body.user.email).toBe(user.email);
        expect(response.body.token).toBeTruthy();
        authToken = response.body.token;
    });
    //create new user
    await (0, supertest_1.default)(app)
        .post("/api/newuser")
        .set('Authorization', 'bearer ' + authToken)
        .send(user_examples_1.level0User)
        .expect(200)
        .then(async (response) => {
        expect(response.body.first).toBe(user_examples_1.level0User.first);
        const new_user = await user_1.default.findById(response.body._id);
        expect(new_user).toBeTruthy();
    });
    await (0, supertest_1.default)(app)
        .post("/api/newuser")
        .set('Authorization', 'bearer ' + authToken)
        .send(user_examples_1.level1User)
        .expect(200)
        .then(async (response) => {
        expect(response.body.first).toBe(user_examples_1.level0User.first);
        const new_user = await user_1.default.findById(response.body._id);
        expect(new_user).toBeTruthy();
    });
    await (0, supertest_1.default)(app)
        .post("/api/newuser")
        .set('Authorization', 'bearer ' + authToken)
        .send(user_examples_1.level2User)
        .expect(401);
    const user0 = await user_1.default.create(user_examples_1.level0User);
    const data0 = user_examples_1.level0User;
    //login
    await (0, supertest_1.default)(app)
        .post("/api/login")
        .send(data0)
        .expect(200)
        .then(async (response) => {
        expect(response.body.user.first).toBe(user0.first);
        expect(response.body.user.email).toBe(user0.email);
        expect(response.body.token).toBeTruthy();
        authToken = response.body.token;
    });
    await (0, supertest_1.default)(app)
        .post("/api/newuser")
        .set('Authorization', 'bearer ' + authToken)
        .send(user_examples_1.level0User)
        .expect(401);
});
