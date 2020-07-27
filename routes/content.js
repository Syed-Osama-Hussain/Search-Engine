const express = require("express");
const router = express.Router();
const { Content } = require('../models/content');
const childProc = require('child_process');
const searcher = require('../searcher');


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

    res.send(content);
    
});


router.post("/search", async (req,res) => {
    const content = await Content.find({});
    const result = searcher(req.body.query,content);
    res.send(result);
});

module.exports = router;