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
    const cmnd = req.body.cmnd;


    if (email && password && confirmPassword && username && phone && address && cmnd) {
        let data = {
            email,
            password,
            confirmPassword,
            username,
            phone,
            address,
            cmnd
        }

        if (password != confirmPassword) {
            return done(null, false, req.flash('message', 'pass'), req.flash('data', data));
        }
        
        User.findOne({ 'email': email }, (err, user) => {
            if (user) {
                return done(null, false, req.flash('message', 'email'), req.flash('data', data));
            }
            
            const newUser = new User({
                email: email,
                password: password,
                name: username,
                phone: phone,
                address: address,
                cmnd: cmnd
            });

            console.log(newUser);
            newUser.save(err => {
                if (err) {
                    console.log('err', err);
                    return done(null, false, req.flash('message', 'save'));
                } else {
                    return done(null, newUser);
                }
            });
        });

    } else {
        return done(null, false, req.flash('message', 'disfull'));
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