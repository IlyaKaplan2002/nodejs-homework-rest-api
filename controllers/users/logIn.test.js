// const logIn = require("./logIn");

// // test("should returN response status 200 {status:'success', code:200, data: {token: String, user:{email: String, subscription: String}}}", () => {});

// describe("login controller", () => {
//   test("should return response status 200", async () => {
//     const req = { body: { email: "test@mail.com", password: "123456" } };
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//     const next = jest.fn();

//     await logIn(req, res, next);
//     expect(res.status).toBe(200);
//     expect(req.json).toBe({
//       status: "success",
//       code: 200,
//       data: { token: String, user: { email: String, subscription: String } },
//     });
//   });
// });
