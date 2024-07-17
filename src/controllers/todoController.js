const { Error } = require("mongoose");
const { Todo } = require("../models/TodoModels");

const addTask = async (req, res) => {
  try {
    const data = req.body;

    if (!data.title)
      res
        .status(400)
        .json({ error: "Bad Request", message: "Title is required." });
    const new_task = new Todo(data);
    await new_task.save();
    if (new_task) {
      res
        .status(201)
        .json({
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

const updateTask=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

module.exports = { addTask };
