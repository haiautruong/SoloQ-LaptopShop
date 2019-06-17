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
router.post("/login", passport.authenticate('login'), (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect(req.session.returnTo || '/');
        delete req.session.returnTo;
    } else {
        res.redirect('/users/login');
    }
});

// router.post("/signup", (req, res, next) => controller.signup(req, res, next));
router.post("/signup", passport.authenticate('signup'), (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect(req.session.returnTo || '/');
        delete req.session.returnTo;
    } else {
        res.redirect('/users/signup');
    }
});

router.get("/cart", (req,res) => controller.cart(req,res));
router.get("/checkout", (req,res) => controller.checkout(req,res));
router.post("/checkout", (req,res) => controller.placeOrder(req,res));


router.get("/account", (req,res) => controller.account(req,res));
router.get("/history", (req,res) => controller.history(req,res));
router.get("/change-pass", (req,res) => controller.change(req,res));
router.post("/change-pass", (req,res) => controller.saveChange(req,res));


module.exports = router;
