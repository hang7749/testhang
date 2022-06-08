const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const favicon = require('serve-favicon');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
//const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


//D:\Programming\nodeJs\CRUD_Application_Node-master\assets\favicon.ico
// Returns a middleware to serve favicon
//app.use(favicon(path.join(__dirname, 'favicon.ico')));
//app.use('/favicon.ico', express.static('public/favicon.ico'));

app.use("/public", express.static('public')); 

// load routers
app.use('/', require('./server/routes/router'))

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, ()=> { console.log(`Server is running on http://localhost:${port}`)});