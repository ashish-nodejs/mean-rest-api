const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Blog = new Schema({
  Blog_by: {
    type: String
  },
  Blog_title: {
    type: String
  },
  Blog_category: {
    type: String
  },
  Blog_tags: {
    type: String
  },
  Blog_updated_on: {
    type: Date, default: Date.now
  },
  Blog_published_on: {
    type: Date, default: Date.now
  },
  Blog_content: {
    type: String
  },
}, {
    collection: 'Blog'
  });


  // Blog.pre('save', function preSave(next){
  //   this.Blog_updated_on(Date.now());
  //   next();
  // });

module.exports = mongoose.model('Blog', Blog);
