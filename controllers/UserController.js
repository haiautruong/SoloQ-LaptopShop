const dbs = require('../database/index');
const bcrypt = require('bcrypt');
const productHelper = require('../helpers/productHelper');

let category = dbs.category;
let User = dbs.user;
let Brand = dbs.brand;
let Transaction = dbs.transaction;

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fbcrawlerhcmus3@gmail.com',
        pass: 'yamoshi2013'
    }
});


let listCategory;
category.find().exec((err, list) => {
    if (err) item.push(err);
    listCategory = list;
});

exports.indexLogin = (req, res) => {
    console.log("call hereee");

    if (req.isAuthenticated()) {
        return res.redirect('/');
    } else {
        let mess = req.flash('message')[0];
        console.log('mess', mess);
        res.render("user/login", { listCategory, loginNotify: mess });
    }
}

exports.indexForget = (req, res) => {
    res.render("user/forgetPass", { listCategory });
}

exports.forget = (req, res) => {
    var mailOptions = {
        from: 'fbcrawlerhcmus3@gmail.com',
        to: 'haiau762@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        console.log(error, info);
        if (error) {
            console.log(error);
            res.redirect("/users/forget");
        } else {
            console.log('Email sent: ' + info.response);
            res.redirect("/");
        }
    });
}

exports.indexSignup = (req, res) => {
    if (!req.isAuthenticated()) {

        let mess = req.flash('message')[0];
        let data = req.flash('data')[0];

        let notify = {
            pass: null,
            email: null,
            save: null
        };

        if (mess === 'pass') {
            notify.pass = 'Mật khẩu không trùng khớp'
        }
        else if (mess === 'email') {
            notify.email = 'Email đã tồn tại'
        }
        else if (mess === 'save' || mess == 'disfull') {
            notify.save = 'Có lỗi xảy ra @@! Xin thử lại'
        }
        console.log('notify', notify);
        console.log('mess', mess);
        return res.render('user/signup', { listCategory, notify, data });
    } else {
        req.redirect('/')
    }
}

exports.cart = (req, res) => {
    let userSession = req.user;
    console.log('cart');

    Brand.getAllBrands().exec((err, listBrand) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('user/cart', { listCategory, userSession, listBrand });
        }
    })

}

exports.checkout = (req, res) => {
    if (req.isAuthenticated()) {
        Brand.getAllBrands().exec((err, listBrand) => {
            let userSession = req.user;
            console.log(userSession);
            res.render('user/checkout', { listCategory, userSession, listBrand });
        });
    }
    else {
        req.session.returnTo = '/users/checkout';
        res.redirect('/users/login');
    }
}

//post
exports.placeOrder = (req, res) => {
    console.log("body", req.body);
    console.log(req.user);
    let result = JSON.parse(req.body.listProductPay);
    console.log("result", result);


    const idUser = req.user._id;
    const listProducts = result.listProducts;
    const total = result.total;
    const status = -1;
    const address = req.body.address;
    const phone = req.body.phone;

    const transaction = new Transaction({
        idUser,
        listProducts,
        total,
        status,
        phone,
        address
    });

    console.log("Transaction", transaction);
    console.log("listTrans", transaction.listProducts);
    transaction.save((err) => {
        if(err){
            console.log("err save transaction: ", err);
        }
        else{
            res.redirect('/users/history');
        }
    })
}

exports.history = (req, res) => {
    if (req.isAuthenticated()) {
        let userSession = req.user;
        Transaction.gettransaction(userSession._id).exec((err, transactions) =>{
            if(err) {
                console.log("history err: ", err);
            }
            else{
                Brand.getAllBrands().exec((err, listBrand) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.render('user/history', { listCategory, userSession, listBrand, transactions });
                    }
                })
            }
        })
    }
    else {
        req.session.returnTo = '/users/history';
        res.redirect('/users/login');
    }
}

exports.account = (req, res) => {
    if (req.isAuthenticated()) {
        let userSession = req.user;
        res.render('user/account', { listCategory, userSession });
    }
    else {
        req.session.returnTo = '/users/account';
        res.redirect('/users/login');
    }

}

exports.change = (req, res) => {

    if (req.isAuthenticated()) {
        let messageFlash = req.flash('message');
        console.log("messageFlash", messageFlash);

        let messRes = messageFlash.length == 0 ? null : messageFlash[0];
        let userSession = req.user;

        res.render('user/changePass', { listCategory, userSession, messRes});
    }
    else {
        req.session.returnTo = '/users/change-pass';
        res.redirect('/users/login');
    }
}

exports.saveChange = (req, res) => {
    try {
        console.log("change pass");
        if (req.isAuthenticated()) {

            let userSession = req.user;
            const curPassword = req.body.password_cur;
            const newPassword = req.body.password_new;
            const renewPassword = req.body.password_renew;

            bcrypt.compare(curPassword, userSession.password, (err, status) => {
                console.log("Status", status);
                if (err || status == false) {
                    console.log("err bcrypt", err);
                    req.flash('message', {
                        status: 0,
                        message: 'Mật khẩu không hiện tại không chính xác!'
                    });

                    res.redirect('/users/change-pass');
                } else {
                    console.log("new pass", newPassword);
                    if (newPassword !== renewPassword) {
                        req.flash('message', {
                            status: 0,
                            message: 'Mật khẩu không trùng khớp!'
                        });
                        
                        res.redirect('/users/change-pass');

                    } else {
                        // User.update({_id: userSession._id}, {
                        //     password
                        // })
                        bcrypt.hash(newPassword, 10, function (err, hashPass) {
                            if (err) {
                                req.flash('message', {
                                    status: 0,
                                    message: 'Đổi mật khẩu không thành công!'
                                });
                                res.redirect('/users/change-pass');

                            } else {
                                User.findOneAndUpdate({ _id: userSession._id }, { password: hashPass }, (err) => {
                                    if (err) {
                                        req.flash('message', {
                                            status: 0,
                                            message: 'Đổi mật khẩu không thành công!'
                                        });
                                        res.redirect('/users/change-pass');

                                        console.log(err);
                                    } else {
                                        req.flash('message', {
                                            status: 1,
                                            message: 'Đổi mật khẩu thành công!'
                                        });

                                        res.redirect('/users/change-pass');
                                    }
                                });
                            }
                        });
                    }
                }

            });
        }
    }
    catch (err) {
        console.log(err);
    }

}