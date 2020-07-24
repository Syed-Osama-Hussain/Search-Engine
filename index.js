const express = require('express');
const app =  express();
const childProc = require('child_process');
const mongoose = require('mongoose');
const { Content } = require('./models/content');
let result;

var url = process.env.DATABASEURL || "mongodb://localhost/search_engine"
mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true});

app.get("/createIndex",  (req,res) => {
    
    result = childProc.fork('./indexer.js',["https://github.com/Netflix/Hystrix/wiki"]);

    result.on("message",  async (res) => {
        console.log(res)
        // await Content.insertMany(res)
    })
    
    res.send("Done!")
})

app.get("/",async (req,res) => {
    const content = await Content.find({});
    res.send(content);
});



var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
    console.log("Listening on Port 3000");
});