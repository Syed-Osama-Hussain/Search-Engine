const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const util = require('util');
const path = require('path');
const childProc = require('child_process');
const exec = util.promisify(require('child_process').exec);
const { Content } = require('../models/content');
const { User } = require('../models/user');
const admin = require('../middleware/admin')
const authCheck = require('../middleware/authCheck')
const searcher = require('../searcher');
const config = require("../config.json")


router.get("/",async (req,res) => {
    const content = await Content.find({});
    res.send(content);
});


router.post("/", admin , async (req,res) => {
    const url = req.body.url

    if(!url.endsWith(".wiki.git")) return res.status(400).send("The URL must be of a github wiki.");

    let wikiUrl = `${url.replace(".wiki.git",'')}/wiki`
    let dirname = url.split("/");
    dirname = dirname[dirname.length - 1].split(".")[0]

    try{
        const { stdout, stderr } = await exec(`git clone ${url} wiki/${dirname}`)

    }catch(err){

        return res.status(404).send(err.stderr);
    }

    try{
        const result = childProc.fork(path.join(__dirname, '../indexer.js'),[wikiUrl,`wiki/${dirname}`]);

        result.on("message",  async (response) => {
            if(response.length !== 0)
                await Content.insertMany(response)
                return res.send("Done")

            return res.send(404).send("No indexable data found in provided wiki")
        });
    }catch(ex){
        res.send(str(ex))
    }
    
});


router.get("/:id",authCheck,async (req,res) => {
    const content = await Content.findById(req.params.id).select("-__v");
    if (!content)
    return res
      .status(404)
      .send("The result with given Id was not found.");
    
    if(req.user)
    {    
        const user = await User.findById(req.user._id)
        user.history.push(content._id);
        await user.save();  
    }

    res.send(content);    
});


router.post("/search", async (req,res) => {
    const content = await Content.find({});
    const result = searcher(req.body.query,content);
    
    if(result.length === 0) return res.status(404).send("Sorry! No result found.");

    res.send(result);
});

module.exports = router;