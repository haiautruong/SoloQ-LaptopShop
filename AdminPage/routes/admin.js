const express = require('express');
const router = express.Router();

/**
 * Routing for Admin
 */

const AdminController = require("../controllers/AdminController");
const controller = new AdminController();

router.get("/", (req,res) => controller.index(req,res));
router.get("/order", (req,res) => controller.order(req,res));
router.get("/product", (req,res) => controller.product(req,res));
router.get("/user", (req,res) => controller.user(req,res));

module.exports = router;