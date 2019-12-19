var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

var users = require('./routes/Users');
var products = require("./routes/Product");
var studentRecords = require("./routes/Studentrecord");
var auths = require("./routes/Authentications");
var chat = require("./routes/Chat");
var category = require("./routes/Category");
var brand = require("./routes/Brands");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept");
  next();
})

app.use('/api/v1/users', users);
app.use('/api/v1/product', products);
app.use('/api/v1/studentrecord', studentRecords);
app.use("/api/v1/auth", auths);
app.use("/api/v1/chat", chat);
app.use("/api/v1/category", category);
app.use("/api/v1/brand", brand);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


////////////parvin
var pages=require("./routes/GetPages");
app.use("/api/v1/page", pages);
var config = require('./config');
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));
app.set('views', path.join(__dirname, './vievs'));
app.set('view engine', 'ejs');
app.use(function(req, res, next) {
	res.render('login.ejs') 
});


/////////

module.exports = app;
