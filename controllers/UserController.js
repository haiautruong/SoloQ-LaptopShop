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
        if(req.body.password != req.body.confirm_password){
            console.log('not match');
        }
    
        if(req.body.email && req.body.username && req.body.password && 
            req.body.confirm_password && req.body.phone && req.body.address){
                var userData = new user({
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.username,
                    phone: req.body.phone,
                    address: req.body.address
                })
    
                userData.save(err => {
                    if(err) {
                        console.log('err', err);
                        res.status(500).send(err);
                    }else {
                        req.session.userId = userData._id;
                        req.session.username = userData.name;
                        req.session.password = userData.password;
                        req.session.phone = userData.phone;
                        req.session.address = userData.address;
                        req.session.email = userData.email;
                        
                        res.redirect('/');
                    }
                });
        }
}

exports.update = (req, res) => {
    let userSession = req.session;
    res.render("user/updateInfo", {listCategory, userSession});
}

exports.cart = (req, res) => {
    let userSession = req.session;
    console.log('cart');
    res.render('user/cart', {listCategory, userSession})
}