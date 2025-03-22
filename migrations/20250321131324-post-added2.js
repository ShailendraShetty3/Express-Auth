const Post = require("../models/Posts");
const Category = require("../models/Category");

module.exports = {
  async up(db, client) {
    // Example: Convert existing posts category from ID to name (if needed)
    const posts = await Post.find().populate("category");
    
    for (const post of posts) {
      if (post.category && post.category.name) {
        await Post.updateOne(
          { _id: post._id },
          { $set: { category: post.category.name } }
        );
      }
    }

    // You can also log something if needed
    console.log("Category reference migrated from ObjectId to name in posts");
  },

  async down(db, client) {
    // Optional rollback logic to revert names back to ObjectIds if needed
  }
};
