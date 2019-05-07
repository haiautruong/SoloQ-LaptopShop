class AdminController {

    index(req, res) {
        res.render('admin/index');
    }

    order(rep, res) {
        res.render('admin/order');
    }

    product(rep, res) {
        res.render('admin/product');
    }

    user(rep, res) {
        res.render('admin/user');
    }
}

module.exports = AdminController;
