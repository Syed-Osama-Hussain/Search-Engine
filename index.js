const express = require('express');
const app =  express();
const childProc = require('child_process');
const mongoose = require('mongoose');
const { Content } = require('./models/content');
let result;

var url = process.env.DATABASEURL || "mongodb://localhost/search_engine"
mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true});

app.get("/createIndex", (req,res) => {
    result = childProc.fork('./indexer.js',{
        execArgv: ['https://github.com/Netflix/Hystrix/wiki/']
      });
    // console.log(result);
    result.on("message", async (res) => {
        console.log(res)
        // await Content.insertMany(res)
    })
    
    res.send("Done!")
})

app.get("/",async (req,res) => {
    const content = await Content.find({});
    // let c = new Content({title: "test",
    //     title_url: "test title url",
    //     heading: "test heading",
    //     heading_url: 'test heading url',
    //     content: 'testing content',
    //     tags: ["test1","test2","test3"]
    // });
    // c = await c.save()
    res.send(content);
});



var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
    console.log("Listening on Port 3000");
});