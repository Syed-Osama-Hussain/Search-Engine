const express = require("express");
const router = express.Router();
const { Content } = require('../models/content');
const childProc = require('child_process');


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
    
})

module.exports = router;