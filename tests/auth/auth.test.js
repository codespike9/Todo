require("dotenv").config({ path: ".env.tests" });
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app"); 
const User = require("../../src/models/UserModels"); 

beforeAll(async () => {
  const mongoUri=process.env.MONGOURI_AUTH;
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth APIs", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  afterEach(async () => {
    await User.deleteMany({});
  });
  describe("Register", () => {
    it("should register a new user", async () => {
      const response = await request(app)
        .post("/api/user/register")
        .send({
          name: "Test User",
          email: "testuser@example.com",
          password: "testpassword",
        })
        .expect(201);

      expect(response.body.user.email).toBe("testuser@example.com");
    });

    it("should return 400 if any field is missing", async () => {
      const res = await request(app).post("/api/user/register").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("All fields are required.");
    });

    it("should return 409 if user already exists", async () => {
      await request(app).post("/api/user/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      const res = await request(app).post("/api/user/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(409);
      expect(res.body.message).toBe("User already exists.");
    });
  });

  describe("POST /api/user/login", () => {
    it("should login an existing user", async () => {
      await request(app).post("/api/user/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      const res = await request(app).post("/api/user/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("Login successful!!");
      expect(res.body.user).toEqual({
        username: "Test User",
        email: "test@example.com",
      });
    });

    it("should return 400 if email or password is missing", async () => {
      const res = await request(app).post("/api/user/login").send({
        email: "test@example.com",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("All fields are required.");
    });

    it("should return 401 if credentials are invalid", async () => {
      const res = await request(app).post("/api/user/login").send({
        email: "nonexistent@example.com",
        password: "wrongpassword",
      });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Invalid username or password");
    });
  });

});
