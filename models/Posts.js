const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    status: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
