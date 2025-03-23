const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    item : {type: String, reqired: true},
    price: {type: Number, required: true}
},{timestamps: true, strict:false});

module.exports= mongoose.model("Order", orderSchema)