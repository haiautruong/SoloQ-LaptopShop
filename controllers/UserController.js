const dbs = require('../database/index');
let category = dbs.category;

let listCategory;
category.find().exec((err, list) => {
    if(err) item.push(err);
    listCategory = list;
});

exports.login = (req, res) => {
        res.render("user/login", {listCategory});
}

exports.postLogin = (req, res) => {
        console.log('body', req.body);
}

exports.forget = (req, res) => {
        res.render("user/forgetPass", {listCategory});
}

exports.signup = (req, res) => {
        res.render("user/signup", {listCategory});
}

exports.update = (req, res) => {
        res.render("user/updateInfo", {listCategory});
}