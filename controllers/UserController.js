const dbs = require('../database/index');
let category = dbs.category;
let user = dbs.user;

let listCategory;
category.find().exec((err, list) => {
    if(err) item.push(err);
    listCategory = list;
});

exports.indexLogin = (req, res) => {
    user.findById(req.session.userId)
    .exec((error, user) => {
        if(error){
            return next(error);
        }else {
            if(user === null){
                res.render("user/login", {listCategory});
            } else{
                console.log('logined', req.session);
                return res.redirect('/');
            }
        }
    })   
}

exports.login = (req, res) => {
        const user = dbs.user;
    const email = req.body.email;
    const password = req.body.password;

    console.log('email', email);
    console.log('pass', password);

    user.find()
        .where('email').equals(email)
        .exec((err, result) => {
            if(err || result.length == 0){
                res.render('user/login', {loginNotify: 'Tên đăng nhập hoặc mật khẩu sai'});
                return;
            }

            console.log(result[0].address);
            console.log(result[0].password);
            if(password == result[0].password){
                req.session.userId = result[0]._id;
                req.session.username = result[0].name;
                req.session.phone = result[0].phone;
                req.session.address = result[0].address;
                req.session.password = result[0].password;
                req.session.email = result[0].email;

                console.log('userId', req.session.userId);
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
    let userSession = req.session;
    res.render("user/updateInfo", {listCategory, userSession});
}