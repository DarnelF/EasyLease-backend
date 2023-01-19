const request = require("supertest");
const app = require("../app");
const User = require("../models/users");
const bcrypt = require("bcrypt");

// Nettoyer la base de données avant chaque test
beforeEach(async () => {
  await User.deleteMany({});
});

describe("GET /test", () => {
  test("should return JSON object with key 'result' and value true", async () => {
    const res = await request(app).get("/users/test");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: true });
  });
});

describe("POST /signup", () => {
  test("with missing fields should return JSON object with key 'result' and value false", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send({ email: "test@example.com" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      result: false,
      error: "Champs vides ou manquants !",
    });
  });

  test("with valid fields should create new user and return JSON object with key 'result' and value true", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send({ email: "test@example.com", password: "password123" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      result: true,
      token: expect.any(String),
      email: "test@example.com",
      poste: "Developpeur",
      isAdmin: false,
    });
    const user = await User.findOne({ email: "test@example.com" });
    expect(bcrypt.compareSync("password123", user.password)).toBe(true);
  });

  test("with existing email should return JSON object with key 'result' and value false", async () => {
    await request(app)
      .post("/users/signup")
      .send({ email: "test@example.com", password: "password123" });
    const res = await request(app)
      .post("/users/signup")
      .send({ email: "test@example.com", password: "password456" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      result: false,
      error: "Utilisateur déja existant",
    });
  });
});
