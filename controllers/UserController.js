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

exports.indexSignup = (req, res) => {
    res.render("user/signup", {listCategory});
}

exports.signup = (req, res) => {
        // confirm that user typed same password twice
        if(req.body.passport !== req.body.confirm_password){
            var err = new Error ('Password do not match.');
            err.status = 400;
            res.send("Password do not match");
            return next(err);
        }
    
        if(req.body.email && 
            req.body.name && 
            req.body.password &&
            req.body.confirm_password &&
            req.body.phone &&
            req.body.address){
                var userData = {
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password,
                    phone: req.body.phone,
                    address: req.body.address
                }
    
                user.create(userData, (error, user) => {
                    if(error) {
                        return next(error);
                    }else {
                        req.session.userId = user._id;
                        return res.redirect('/');
                    }
                });
            }else if(req.body.logemail && req.body.logpassword){
                user.authenticate(req.body.logemail, req.body.logpassword, (err, user) => {
                    if(err || !user) {
                        var error = new Error('Wrong email or password.');
                        err.status = 401;
                        return next(err);
                    }else {
                        req.session.userId = user._id;
                        return res.redirect('/');
                    }
                });
            }else {
                var error = new Error('All fields required.');
                error.status = 400;
                return next(error);
            }
}

exports.update = (req, res) => {
    let userSession = req.session;
    res.render("user/updateInfo", {listCategory, userSession});
}