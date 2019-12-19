var express = require('express');
var router = express.Router();
var Users = require("../controller/UserController");
var jwt = require('jsonwebtoken');


router.post('/', function(req, res, next) {
  console.log(req.body);
  var data = req.body;
  var loginKey = data.matrikel_number;
  var password= data.password;
  /*if(req.query.username)
  loginKey=req.query.username;
  else if(req.query.matrikel_number)
  loginKey=req.query.matrikel_number;*/
  var token = jwt.sign({ loginKey:loginKey,password:password }, "GDSD");

	Users.getUser(loginKey,password, (rows) => {
		if (!rows || !rows.length) {
			// res.json({
			// 	"status": "failed",
			// 	"user": null
			// })
			res.redirect("/api/v1/page/login");
		} else {
			// res.json({
			// 	token,
			// 	"status": "sucessfull",
			// })
			res.redirect("/api/v1/product");
		}
	})

});

module.exports = router;
