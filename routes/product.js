var express = require('express');
var router = express.Router();

/**
 * Routing for Product
 */


const controller = require("../controllers/ProductController"); 

router.get("/detail/:id", (req, res) => controller.detail(req,res));

router.get("/category/:id", (req, res) => controller.store(req, res));

router.get("/brand/:id", (req, res) => controller.store(req, res));

router.post("/search", (req, res) => controller.search(req, res));

router.post("/comments", (req, res) => controller.comments(req, res));

module.exports = router;