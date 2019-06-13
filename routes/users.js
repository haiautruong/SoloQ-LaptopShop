var express = require('express');
var router = express.Router();
const passport = require('passport');
/**
 * Routing for User
 */

const controller = require("../controllers/UserController");

router.get("/login", (req, res) => controller.indexLogin(req, res));
router.get("/signup", (req, res, next) => controller.indexSignup(req, res));

// router.get("/update", (req, res) => controller.update(req, res));
router.get("/forget", (req, res) => controller.indexForget(req, res));
router.post("/forget", (req, res) => controller.forget(req, res));

// router.post("/login", (req, res) => controller.login(req, res));
router.post("/login", passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}));

// router.post("/signup", (req, res, next) => controller.signup(req, res, next));
router.post("/signup", passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/users/signup',
    failureFlash: true
}));

router.get("/cart", (req,res) => controller.cart(req,res));

router.get("/account", (req,res) => controller.account(req,res));

router.get("/history", (req,res) => controller.history(req,res));

module.exports = router;
