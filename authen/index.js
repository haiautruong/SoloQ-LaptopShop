const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

const serializeUser = (user, done) => {
    done(null, user._id);
}

const deserializeUser = (id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
}

const signupStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    const confirmPassword = req.body.confirm_password;
    const username = req.body.username;
    const phone = req.body.phone;
    const address = req.body.address;


    if (email && password && confirmPassword && username && phone && address) {
        if (password != confirmPassword) {
            return done(null, false, req.flash('message', 'Mật khẩu không trùng khớp!'));
        }

        User.findOne({ 'email': email }, (err, user) => {
            if (user) {
                return done(null, false, req.flash('message', 'Tài khoản đã tồn tại!'));
            }

            const newUser = new User({
                email: email,
                password: password,
                name: username,
                phone: phone,
                address: address
            });

            console.log(newUser);
            newUser.save(err => {
                if (err) {
                    console.log('err', err);
                    return done(null, false, req.flash('message', 'Đã xảy ra lỗi, vui lòng kiểm tra lại!'));
                } else {
                    return done(null, newUser);
                }
            });
        });

    } else {
        return done(null, false, req.flash('message', 'Vui lòng kiểm tra lại!'));
    }
});

const loginStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, (req, email, password, done) => {
    console.log("CALLLLL", email, password);

    User.findOne({ 'email': email }, (err, user) => {
        if (err) {
            done(err);
        }

        if (!user) {
            console.log('User not found email ', email);
            return done(null, false, req.flash('message', 'Tên đăng nhập hoặc mật khẩu không chính xác!'));
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err || result == false) {
                return done(null, false, req.flash('message', 'Tên đăng nhập hoặc mật khẩu không chính xác!'));
            }

            return done(null, user);
        });
    });
});

module.exports = {
    serializeUser,
    deserializeUser,
    signupStrategy,
    loginStrategy
}