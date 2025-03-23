const express = require("express");
const Order= require("../models/orders");
const authMiddleware= require("../middleware/authMiddleware");
const router= express.Router();


router.post("/", authMiddleware, async(req, res)=>{
    try{
        const userId= req.user.userId || req.user.id

        const order= new Order({
            ...req.body,
            user: userId
        });
        await order.save()
        res.status(201).json(order)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})

router.get("/", authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId || req.user.id;
      const order = await Order.find({ user: userId }).sort({ createdAt: -1 }); // latest first
      // const tasks = await Task.find({ user: req.user.userId });
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });




module.exports=router;