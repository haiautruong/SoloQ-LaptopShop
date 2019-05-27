const dbs = require('../database/index');
let category = dbs.category;

let listCategory;
category.find().exec((err, list) => {
    if(err) item.push(err);
    listCategory = list;
});

exports.indexLogin = (req, res) => {
        res.render("user/login", {listCategory});
}

exports.login = (req, res) => {
        const user = dbs.user;
    const email = req.body.email;
    const password = req.body.password;

    console.log('email', email);
    console.log('pass', password);

    user.find()
        .where('email').equals(email)
        .select('password')
        .exec((err, result) => {
            if(err || result.length == 0){
                res.render('user/login', {loginNotify: 'Tên đăng nhập hoặc mật khẩu sai'});
                return;
            }

            console.log(result[0]);
            console.log(result[0].password);
            if(password == result[0].password){
                res.redirect('/');
                return;
            }
            else{
                res.render('user/login', {loginNotify: 'Tên đăng nhập hoặc mật khẩu sai'});
                return;
            }

        })
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