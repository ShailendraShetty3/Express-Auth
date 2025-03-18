const express = require("express");
const Task = require("../models/task");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create Task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    // const task = new Task(req.body);
    const task = new Task({
      ...req.body,
      user: userId
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get Tasks (Only for Authorized Users)
router.get("/", authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId || req.user.id;
      const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 }); // latest first
      // const tasks = await Task.find({ user: req.user.userId });
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });


  router.get("/:id", authMiddleware, async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ error: "Task not found" });
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  router.put("/:id", authMiddleware, async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!task) return res.status(404).json({ error: "Task not found" });
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  router.delete("/:id", authMiddleware, async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) return res.status(404).json({ error: "Task not found" });
      res.json({ message: "Task deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

  
  module.exports = router;