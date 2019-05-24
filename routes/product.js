var express = require('express');
var router = express.Router();

/**
 * Routing for Product
 */


const controller = require("../controllers/ProductController"); 

router.get("/detail/:id", (req, res) => controller.detail(req,res));

router.get("/gamer", (req, res) => res.send(req.params));

module.exports = router;