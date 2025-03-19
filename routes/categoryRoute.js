const express = require("express");
const Category = require("../models/Category");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create category
router.post("/", authMiddleware, async (req, res) => {
  try {
    const category = new Category({
      ...req.body,
    });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get Tasks (Only for Authorized Users)
router.get("/", authMiddleware, async (req, res) => {
    try {
      const category = await Category.sort({ createdAt: -1 }); // latest first
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });


  router.get("/:id", authMiddleware, async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).json({ error: "Category not found" });
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  router.put("/:id", authMiddleware, async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!category) return res.status(404).json({ error: "Category not found" });
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  router.delete("/:id", authMiddleware, async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) return res.status(404).json({ error: "Category not found" });
      res.json({ message: "Category deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

  
  module.exports = router;