const Meet = require('../models/meet');

//check if user is a guest.
exports.isGuest = (req, res, next) => {
    if(!req.session.user) {
    return next();
    } else {
        req.flash('error', 'You are logged in already')
        return res.redirect('/users/profile');
    }
};

//check if uer is authenticated
exports.isLoggedIn = (req, res, next) => {
    if(req.session.user) {
        return next();
        } else {
            req.flash('error', 'You need to log in first')
            return res.redirect('/users/login');
        }

};

//check if user is author of the meet
exports.isAuthor = (req, res, next) => {
    let id = req.params.id;
    Meet.findById(id)
    .then(meet => {
        if(meet) {
            if(meet.author == req.session.user) {
                return next()
            } else {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next (err);
            }
        }

    })
    .catch(err => next(err));



};

//check if user is not author of the meet
exports.isNotAuthor = (req, res, next) => {
    let id = req.params.id;
    Meet.findById(id)
    .then(meet => {
        if(meet) {
            if(meet.author != req.session.user) {
                return next()
            } else {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next (err);
            }
        }

    })
    .catch(err => next(err));



};