class UserControler {
    login(req, res) {
        res.render("user/login");
    }

    forget(req, res) {
        res.render("user/forgetPass");
    }

    signup(req, res) {
        res.render("user/signup");
    }

    update(req, res) {
        res.render("user/updateInfo");
    }

}

module.exports = UserControler;