var express = require('express');
var router = express.Router();

/**
 * Routing for Home page
 */
const HomeController = require("../controllers/HomeController");
const controller = new HomeController();

 router.get('/', (req,res)=>controller.index(req,res));

module.exports = router;
