const mongoose = require('mongoose');

const Content = mongoose.model('Content', new mongoose.Schema({
    title: String,
    title_url: String,
    heading: String,
    heading_url: String,
    content: String,
    tags: [String]
  }));
  

exports.Content = Content; 