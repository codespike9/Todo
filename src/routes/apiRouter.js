const express = require("express");
const router = express.Router();

const todoRouter = require("./todoRouter");
const authRouter = require("./authRouter");

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User authentication
 *   - name: Todos
 *     description: Manage tasks
 */

// Use the auth and todo routers
router.use('/user', authRouter);
router.use('/todo', todoRouter);

module.exports = router;
