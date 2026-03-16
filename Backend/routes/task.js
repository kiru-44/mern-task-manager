const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/tasks
///create task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = new Task({
      title,
      description,
      user: req.user.id
    });

    await task.save();

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//get all tasks
// GET /api/tasks
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//update task
// PUT /api/tasks/:id
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//delete task
// DELETE /api/tasks/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;