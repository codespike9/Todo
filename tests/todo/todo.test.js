require("dotenv").config({ path: ".env.tests" });
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../src/app");
const Todo = require("../../src/models/TodoModels");
const User = require("../../src/models/UserModels");
const jwt = require("jsonwebtoken");
const generateToken = require("../../src/utils/generateToken");

beforeAll(async () => {
  const mongoUri = process.env.MONGOURI_TODO;
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("TODO APIs with Auth Middleware", () => {
  let access_token;
  let user_id;

  beforeEach(async () => {
    await Todo.deleteMany({});
    await User.deleteMany({});

    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "password@123",
    });

    user_id = user._id;
    access_token = generateToken({ id: user_id });
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/todo/add", () => {
    it("should add a new task", async () => {
      const taskData = {
        title: "New Task",
        description: "Task description",
      };

      const response = await request(app)
        .post("/api/todo/add-task")
        .set("Cookie", `accessToken=${access_token}`)
        .send(taskData)
        .expect(201);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.task.title).toBe("New Task");
    });

    it("should return 400 if title is missing", async () => {
      const taskData = {
        description: "Task description",
      };

      const response = await request(app)
        .post("/api/todo/add-task")
        .set("Cookie", `accessToken=${access_token}`)
        .send(taskData)
        .expect(400);

      expect(response.body.error).toBe("Bad Request");
      expect(response.body.message).toBe("Title is required.");
    });
  });

  describe("PATCH /todo/update-task", () => {
    it("should update a task", async () => {
      const todo = await Todo.create({
        user_id: user_id,
        title: "Test Todo",
        description: "Test Description",
      });

      const response = await request(app)
        .patch(`/api/todo/update-task?id=${todo._id}`)
        .set("Cookie", `accessToken=${access_token}`)
        .send({ title: "Updated Task" })
        .expect(200);

      expect(response.body.message).toBe("Updated successfully.");
      expect(response.body.updated_data.title).toBe("Updated Task");
    });

    it("should return 404 if task is not found", async () => {
      const taskId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .patch(`/api/todo/update-task?id=${taskId}`)
        .set("Cookie", `accessToken=${access_token}`)
        .send({ title: "Updated Task" })
        .expect(404);

      expect(response.body.message).toBe("Todo not found");
    });
  });

  describe("DELETE /todo/delete-task/:id", () => {
    it("should delete a task", async () => {
      const todo = await Todo.create({
        user_id: user_id,
        title: "Test Todo",
        description: "Test Description",
      });

      const response = await request(app)
        .delete(`/api/todo/delete-task/${todo._id}`)
        .set("Cookie", `accessToken=${access_token}`)
        .expect(200);

      expect(response.body.message).toBe("Todo deleted");
    });

    it("should return 404 if task is not found", async () => {
      const taskId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .delete(`/api/todo/delete-task/${taskId}`)
        .set("Cookie", `accessToken=${access_token}`)
        .expect(404);

      expect(response.body.message).toBe("Task not found");
    });
  });

  describe("GET /todo/my-tasks", () => {
    it("should get all tasks", async () => {
      const tasks = [
        {
          title: "Task 1",
          description: "Task 1 description",
          user_id: user_id,
        },
        {
          title: "Task 2",
          description: "Task 2 description",
          user_id: user_id,
        },
      ];

      await Todo.create(tasks);

      const response = await request(app)
        .get("/api/todo/my-tasks")
        .set("Cookie", `accessToken=${access_token}`)
        .expect(200);

      expect(response.body.message).toBe("Retrieved the list");
      expect(response.body.tasks.length).toBe(2);
    });

    it("should return 404 if no tasks are found", async () => {
      const response = await request(app)
        .get("/api/todo/my-tasks")
        .set("Cookie", `accessToken=${access_token}`)
        .expect(404);

      expect(response.body.message).toBe("You have no tasks");
    });
  });
});
