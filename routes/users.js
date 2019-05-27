var express = require('express');
var router = express.Router();

/**
 * Routing for User
 */

const controller = require("../controllers/UserController");

router.get("/login", (req,res) => controller.indexLogin(req,res));
router.get("/signup", (req,res) => controller.signup(req,res));
router.get("/update", (req,res) => controller.update(req,res));
router.get("/forget", (req,res) => controller.forget(req,res));
router.post("/login", (req, res) => controller.login(req, res));

module.exports = router;
