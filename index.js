const express = require('express');
const app =  express();
const mongoose = require('mongoose');
const content = require('./routes/content');
const user = require('./routes/users')
const auth = require('./routes/auth');

var url = process.env.DATABASEURL || "mongodb://localhost/search_engine"
mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true});

app.use(express.json());
app.use("/content",content);
app.use("/user",user);
app.use("/auth",auth);

let port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
    console.log("Listening on Port 3000");
});