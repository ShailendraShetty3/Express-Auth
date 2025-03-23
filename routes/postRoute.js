const express = require("express");
const Post = require("../models/Posts");
const Category = require("../models/Category");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Post (category by name)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content, description, category, status } = req.body; // category is the name here

    // Find category by name
    const foundCategory = await Category.findOne({ name: category });

    if (!foundCategory) {
      return res.status(400).json({ error: "Category not found" });
    }

    // Create new post with category ID
    const post = new Post({
      title,
      content,
      description,
      status,
      category: foundCategory._id,
    });

    await post.save();

    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all posts (with category name populated)
// router.get("/", async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .populate("category", "name") // populate category name only
//       .sort({ createdAt: -1 }); // latest first
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

//query params
router.get("/", async (req, res) => {
  const { category } = req.query;

  try {
    let filter = {};

    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        return res.status(404).json({ message: "Category not found" });
      }
      filter.category = categoryDoc._id;
    }

    const posts = await Post.find(filter)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Get single post by ID (with category name populated)
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("category", "name");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Post
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, content, description, status, category } = req.body;

    const updateData = { title, content, description, status };

    // If category name is provided, convert it to ObjectId
    if (category) {
      const foundCategory = await Category.findOne({ name: category });
      if (!foundCategory) {
        return res.status(400).json({ error: "Category not found" });
      }
      updateData.category = foundCategory._id;
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate("category", "name");

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Post
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
