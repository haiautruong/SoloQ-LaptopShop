var express = require('express');
var router = express.Router();

/**
 * Routing for Product
 */

const ProductController = require("../controllers/ProductController");
const controller = new ProductController();

router.get("/detail", (req, res) => controller.detail(req, res));

router.get("/gamer", (req, res) => controller.gamer(req, res));

module.exports = router;