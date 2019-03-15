const utility = require('./src/helper/utility');
global.error_message = require('./src/helper/error_message');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
global.mongoose = require('mongoose');
global.Schema = global.mongoose.Schema;


var dbUrl = process.env.DB_URL;
var rootUrl = process.env.ROOT_URL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// db connection
global.mongoose.connect(dbUrl, { useNewUrlParser: true }, function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});
//db connection

// default route
app.use('/api/', function (req, res, next) {
    let contype = req.headers['content-type'];
    if (!contype || contype.indexOf('application/json') !== 0) {       
        return res.send('400', global.responseObject('1', 'Invalid content type. (Only application/json content-type )'));
    }
    else {        
        next();
    }
});
// default route

//  routes
const blogRoute = require('./src/controllers/blog.route');
app.use('/api/', blogRoute);
//  routes




// Setup server port
var port = process.env.PORT || 100;
app.listen(port, function () {
    console.log("Running Server on port " + port);
});

