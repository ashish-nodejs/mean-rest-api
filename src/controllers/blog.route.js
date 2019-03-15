const express = require('express');
const app = express();
const blogRoutes = express.Router();

// Require Business model in our routes module
let BlogModel = require('../models/Blog');

// Defined get data(index or listing) route
blogRoutes.route('/listing').get(function (req, res) {
  BlogModel.find(function (err, blogs) {
    if (err) {
      return res.status(200).send(global.responseObject(2, 'Blog list error', { err: err.stack }));
    }
    else {
      return res.status(200).send(global.responseObject(1, 'Blog list retrieved', { blogList: blogs }));
    }
  });
});


// Defined store route
blogRoutes.route('/add').post(function (req, res) {
  let blog = new BlogModel(req.body);
  blog.set("Blog_updated_on", Date.now());
  blog.save().then(blogRes => {
    return res.status(200).send(global.responseObject(1, 'Blog added', blogRes));
  }).catch(err => {
    return res.status(200).send(global.responseObject(2, 'Blog add err', { err: err.stack }));
  });
});

//  Defined update route
blogRoutes.route('/update').post(function (req, res) {
  BlogModel.findById(req.body._id, function (err, blog) {
    if (err)
      return res.status(200).send(global.responseObject(2, 'Blog updated err', { err: err.stack }));
    else {
      blog.Blog_by = req.body.Blog_by;
      blog.Blog_title = req.body.Blog_title;
      blog.Blog_category = req.body.Blog_category;
      blog.set("Blog_updated_on", Date.now());
      blog.save().then(blog => {
        return res.status(200).send(global.responseObject(1, 'Blog updated', blog));
      }).catch(err => {
        return res.status(200).send(global.responseObject(2, 'Blog updated err', { err: err.stack }));
      });
    }
  });
});

// Defined delete | remove
blogRoutes.route('/delete/:id').delete(function (req, res) {

  BlogModel.findByIdAndRemove({ _id: req.params.id }, function (err, blog) {
    if (err) {
      return res.status(200).send(global.responseObject(2, 'Blog delete err', { err: err.stack }));
    } else {
      return res.status(200).send(global.responseObject(1, 'Blog removed', {}));
    }
  });
});

module.exports = blogRoutes;