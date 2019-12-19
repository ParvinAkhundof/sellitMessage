var express = require('express');
var router = express.Router();
var Category = require("../controller/CategoryController");

router.get('/', function (req, res, next) {
    Category.getAllCategories((rows) => {
        if (!rows || !rows.length) {
            res.json({
                "status": "failed",
                "category": null
            })
        } else {
            res.json({ rows });
        }
    })
});

module.exports = router;