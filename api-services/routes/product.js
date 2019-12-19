var express = require('express');
var Product = require('../controller/ProductController');
var router = express.Router();
var loginVerification = require('../utility/LoginVerification');
var jwt = require('jsonwebtoken');


router.get('/:product_name', function(req, res, next) {
  var product_name = req.params.product_name;
	Product.getAllProductsByName(product_name, (rows) => {
		if (!rows) {
			res.json({
				"status": "failed",
				"user": null
			})
		} else {
      res.json({products: rows});
		}
	});
});

router.get('/id/:id', function(req, res, next) {
  var product_id =req.params.id;
	  Product.getProductById(product_id, (rows) => {
		  if (!rows) {
			  res.json({
				  "status": "failed",
				  "user": null
			  })
		  } else {
		res.render("productDetails.ejs",{products: rows});
		  }
	  });
  });

router.get('/', function(req, res, next) {
  Product.getAllProducts( (rows) => {
		if (!rows || !rows.length) {
			res.json({
				"status": "failed",
				"product": null
			})
		} else {
      res.render("main.ejs",{products: rows});
		}
	})
});

// router.post('/add',loginVerification.verifyToken, function(req, res, next) {
	router.post('/add', function(req, res, next) {
	var data = req.body;


/////Adding Product
Product.addProduct({
	name :data.name,
	slug : data.slug,
	description : data.description,
	price : data.price,
	seller_id : data.seller_id,
	more_details : data.more_details,
	status : data.status,
	category_id : data.category_id,
	brand_id : data.brand_id,
	product_condition : data.product_condition,
	created_date : data.created_date,
	modified_date : data.modified_date

}, (rows) => {
if (!rows || !rows.length  || rows.length==0) {
	res.json({
		"status": "failed",
		"user": null
	})
} else {
	res.json({
		"status": "sucessfull"
	})
}
  })
////////





  });


module.exports = router;
