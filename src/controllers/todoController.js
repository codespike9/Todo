const { Error } = require("mongoose");
const { Todo } = require("../models/TodoModels");

const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 3600*24 });



//Adding a task.
const addTask = async (req, res) => {
  try {
    const data = req.body;
    data.user_id = req.user.id;

    if (!data.title)
      res
        .status(400)
        .json({ error: "Bad Request", message: "Title is required." });

    const new_task = new Todo(data);
    await new_task.save();

    if (new_task) {

      if (myCache.has(`tasks:${req.user.id}`)) {
        myCache.del(`tasks:${req.user.id}`);
      }

      res.status(201).json({
        status: 201,
        message: "Task added successfully.",
        task: new_task,
      });

    } else {
      throw Error("Cannot add task.");
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

//Updating task details
const updateTask = async (req, res) => {
  try {
    const id = req.query.id;
    const task = await Todo.findById(id);

    if (task.user_id !== req.user.id)
      res.status(401).json({ message: "Unauthorized" });

    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (myCache.has(`tasks:${req.user.id}`)) {
      myCache.del(`tasks:${req.user.id}`);
    }
    res
      .status(200)
      .json({ message: "Updated successfully.", updated_data: updatedTodo });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Internal server error." });
  }
};

//Updating status of the task
const changeTaskStatus = async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Todo.findById(id);

    if (task.user_id !== req.user.id)
      res.status(401).json({ message: "Unauthorized" });

    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (myCache.has(`tasks:${req.user.id}`)) {
      myCache.del(`tasks:${req.user.id}`);
    }
    res.status(200).json({
      message: "Status updated successfully.",
      updated_data: updatedTodo.status,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//Deleting a task
const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Todo.findById(id);

    if (task.user_id !== req.user.id)
      res.status(401).json({ message: "Unauthorized" });

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Todo deleted" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//List all the tasks of a user based on task creation time
const getAllTasks = async (req, res) => {
  try {
    const user_id = req.user.id;

    const cachedTasks = myCache.get(`tasks:${user_id}`);
    if (cachedTasks) {
      return res.status(200).json({ message: 'Retrieved the list from cache', tasks: cachedTasks });
    }

    const tasks = await Todo.find({ user_id }).sort({ created_at: -1 });

    if (!tasks.length) {
      res.status(404).json({ message: "You have no tasks" });
    }

    myCache.set(`tasks:${user_id}`, tasks);

    res.status(200).json({ message: "Retrieved the list", tasks: tasks });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//List all the tasks of a user based on their priority
const getTasksByPriority = async (req, res) => {
  try {
    const tasks = await Todo.find().sort({
      priority: { $meta: { high: 1, medium: 2, low: 3 } },
      created_at: -1,
    });

    if (!tasks.length) {
      res.status(404).json({ message: "You have no tasks" });
    }

    res
      .status(200)
      .json({
        message: "Retrieved the list of tasks based on priority.",
        tasks: tasks,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//List of pending tasks
const getAllPendingTaks = async (req, res) => {
  try {
    const user_id = req.user.id;
    const tasks = await Todo.find({ user_id, status: "pending" });

    if (!tasks.length) {
      res.status(404).json({ message: "You have no pending tasks." });
    }

    res
      .status(200)
      .json({
        message: "Retrieved the list of pending tasks",
        pending_tasks: tasks,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//Get all completed tasks
const getAllCompletedTaks = async (req, res) => {
  try {
    const user_id = req.user.id;
    const tasks = await Todo.find({ user_id, status: "completed" });

    if (!tasks.length) {
      res.status(404).json({ message: "You have no completed tasks." });
    }

    res
      .status(200)
      .json({
        message: "Retrieved the list of completed tasks",
        completed_tasks: tasks,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { addTask, updateTask, changeTaskStatus, deleteTask, getAllTasks, getAllCompletedTaks, getAllPendingTaks};
