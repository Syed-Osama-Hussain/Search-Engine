const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Content } = require('../models/content');
const { User } = require('../models/user');
const childProc = require('child_process');
const searcher = require('../searcher');
const config = require("../config.json")


router.get("/",async (req,res) => {
    const content = await Content.find({});
    res.send(content);
});


router.post("/",  (req,res) => {
    const url = req.body.url
    // "https://github.com/Netflix/Hystrix/wiki"
    const result = childProc.fork('../indexer.js',[url]);

    result.on("message",  async (res) => {
        await Content.insertMany(res)
        res.send("Done")
    })
    
});


router.get("/:id", async (req,res) => {
    const content = await Content.findById(req.params.id).select("-__v");

    if (!content)
    return res
      .status(404)
      .send("The result with given Id was not found.");
    
    if(req.session.token)
    {    
        let user = jwt.verify(req.session.token,config.jwtPrivateKey)
        user = await User.findById(user._id)
        user.history.push(content._id);
        await user.save();  
    }

    res.send(content);    
});


router.post("/search", async (req,res) => {
    const content = await Content.find({});
    const result = searcher(req.body.query,content);
    res.send(result);
});

module.exports = router;