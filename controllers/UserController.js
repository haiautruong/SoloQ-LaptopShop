const dbs = require('../database/index');
const bcrypt = require('bcrypt');

let category = dbs.category;
let User = dbs.user;
let Brand = dbs.brand;

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

exports.history = (req, res) => {
    let userSession = req.user;
    res.render('user/history', { listCategory, userSession });
}

exports.account = (req, res) => {
    if (req.isAuthenticated()) {
        let userSession = req.user;
        res.render('user/account', { listCategory, userSession });
    }
    else {
        res.redirect('/');
    }

}

exports.change = (req, res) => {
    if (req.isAuthenticated()) {
        let userSession = req.user;
        res.render('user/changePass', { listCategory, userSession });
    }
    else {
        res.redirect('/users/login');
    }
}

exports.saveChange = (req, res) => {
    if (req.isAuthenticated()) {
        let userSession = req.user;
        const curPassword = req.body.password_cur;
        const newPassword = req.body.password_new;
        const renewPassword = req.body.password_renew;

        bcrypt.compare(curPassword, userSession.password, (err, status) => {
            if (err) {
                req.flash('message', 'Mật khẩu hiện tại không chính xác!');
            } else {
                if (newPassword !== renewPassword) {
                    req.flash('message', 'Mật khẩu hiện tại không chính xác!');
                } else {
                    // User.update({_id: userSession._id}, {
                    //     password
                    // })
                    req.flash('message', 'Đổi mật khẩu thành công');
                }
            }
        });
    }
}