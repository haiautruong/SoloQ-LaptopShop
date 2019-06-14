var express = require('express');
var router = express.Router();

/**
 * Routing for Product
 */


const controller = require("../controllers/ProductController"); 

router.get("/detail/:id", (req, res) => controller.detail(req,res));

router.get("/:idCategory", (req, res) => controller.store(req, res));

router.post("/search", (req, res) => controller.search(req, res));

module.exports = router;