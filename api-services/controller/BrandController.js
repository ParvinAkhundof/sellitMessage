var Brand = require('../model/BrandModel');

module.exports.getAllBrands = function (callback) {
	Brand.findAll()
	  .then(function (related) {
		//console.log(related[0].role.role);
		callback(related);
	  })
	  .catch(function (err) {
		//console.log(err);
		callback(err);
	  });
  }