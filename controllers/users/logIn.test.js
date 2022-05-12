// const mongoose = require("mongoose");
// const request = require("supertest");
// require("dotenv").config();

// const logIn = require("./logIn");
// const app = require("../../app");
// const { User } = require("../../service/schemas");
// const userService = require("../../service/users");

// const { DB_HOST_TESTING } = process.env;

// const testedUser = { email: "test@mail.com", password: "123456" };

// // { email: "test@mail.com", password: "123456" } => status 200
// // { email: "test@mail.com", password: "123456" } => should return {status:'success',code:200,data:{user:{email:String, subscription:String}}}
// // { email: "test@mail.com", password: "123456" } => token should be
// // { email: "test@mail.com", password: "123456" } => token should be equal with database token

// // {} => status 400
// // {} => {status:'failed', code:400, message:"\"password\" is required"}
// // {"email":"test@mail.com"} => status 400
// // {"email":"test@mail.com"} => {status:'failed', code:400, message:"\"password\" is required"}
// // {"password": 123456} => status 400
// // {"password": 123456} => {"status": "failed","code": 400,"message": "\"password\" must be a string"}
// // {"password":"12345"} => status 400
// // {"password":"12345"} => {"status": "failed","code": 400,"message": "\"password\" length must be at least 6 characters long"}
// // {"password": "123456"} => status 400
// // {"password": 123456} => {"status": "failed","code": 400,"message": "\"email\" is required"}
// // {"email":"test","password": "123456"} => status 400
// // {"password": 123456} => {"status": "failed","code": 400,"message": "\"email\" must be a valid email"}
// // {"email":"test@mail.co","password": "123456"} => status 401
// // {"email":"test@mail.co","password": "123456"} => {"status": "failed","code": 401,"message": "Email is wrong"}
// // {"email":"test@mail.com","password": "1234567"} => status 401
// // {"email":"test@mail.com","password": "1234567"} => {"status": "failed","code": 401,"message": "Password is wrong"}

// describe("'/api/users/login' endpoint testing", () => {
//   let server;

//   beforeAll(() => {
//     mongoose.connect(DB_HOST_TESTING).then(() => (server = app.listen(3000)));
//   });

//   afterAll((done) => {
//     mongoose.disconnect(done);
//     server.close();
//   });

//   beforeEach(() => {
//     return request(app).post("/api/users/signup").send(testedUser);
//   });
//   afterEach((done) => {
//     mongoose.connection.db.dropCollection("users").then(() => done());
//   });

//   test('{ email: "test@mail.com", password: "123456" } => status 200, {user:{email:String,subscription:String}}', async (done) => {
//     return request(app).post("/api/users/login").send(testedUser).expect(200);
//   });
// });
