const express = require("express");
const router = express.Router();
const jwt = require("../middlewares/jwtMiddleware");

const {
  addTask,
  updateTask,
  changeTaskStatus,
  deleteTask,
  getAllTasks,
  getAllCompletedTaks,
  getAllPendingTaks,
} = require("../controllers/todoController");

// src/routes/todoRouter.js

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Manage tasks
 */

/**
 * @swagger
 * /todo/add-task:
 *   post:
 *     summary: Add a new task
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Task added successfully
 *       400:
 *         description: Bad request
 */
router.post('/add-task', jwt.verifyAccessToken, addTask);

/**
 * @swagger
 * /todo/update-task:
 *   patch:
 *     summary: Update a task
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: Task not found
 */
router.patch('/update-task', jwt.verifyAccessToken, updateTask);

/**
 * @swagger
 * /todo/change-status/{id}:
 *   patch:
 *     summary: Change task status
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       404:
 *         description: Task not found
 */
router.patch('/change-status/:id', jwt.verifyAccessToken, changeTaskStatus);

/**
 * @swagger
 * /todo/delete-task/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */
router.delete('/delete-task/:id', jwt.verifyAccessToken, deleteTask);

/**
 * @swagger
 * /todo/my-tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retrieved the list
 *       404:
 *         description: No tasks found
 */
router.get('/my-tasks', jwt.verifyAccessToken, getAllTasks);

/**
 * @swagger
 * /todo/pending-tasks:
 *   get:
 *     summary: Get all pending tasks
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retrieved the list
 *       404:
 *         description: No tasks found
 */
router.get('/pending-tasks', jwt.verifyAccessToken, getAllPendingTaks);

/**
 * @swagger
 * /todo/completed-tasks:
 *   get:
 *     summary: Get all completed tasks
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retrieved the list
 *       404:
 *         description: No tasks found
 */
router.get('/completed-tasks', jwt.verifyAccessToken, getAllCompletedTaks);

module.exports = router;

