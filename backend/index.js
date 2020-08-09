const express = require('express');
const app =  express();
const mongoose = require('mongoose');
const session = require('express-session');
const content = require('./routes/content');
const user = require('./routes/users')
const auth = require('./routes/auth');
const config = require('./config.json')

// Local "mongodb://localhost/search_engine"
var url = process.env.DATABASEURL || config.databaseURL
mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true,'useCreateIndex': true});
  
app.use(express.json());

app.use(session({
    secret: "Once again this is a secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use("/content",content);
app.use("/user",user);
app.use("/auth",auth);

let port = process.env.PORT || 3001;
app.listen(port, "0.0.0.0", function() {
    console.log("Listening on Port 3001");
});