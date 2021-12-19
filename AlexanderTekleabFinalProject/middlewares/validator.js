const Meet = require('../models/meet');
const {validationResult} = require('express-validator');
const {body} = require('express-validator');


//checks an objectId is a 24-bit Hex string
exports.validateId = (req, res, next) => {
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connect id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }

};

exports.validateRsvp= [body('rsvp', 'Error: RSVP must be YES, NO or MAYBE').isIn(['YES', 'NO', 'MAYBE'])];

exports.validateSignUp = [body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 character and at most 64 characters').isLength({min: 8, max: 64})
];

exports.validateLogIn = [body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 character and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
            
        });
        return res.redirect('back');
    } else {
        return next();
    }
}

exports.validateMeet = [body('topic', 'Topic cannot be empty').isLength({min: 2}).notEmpty().trim().escape(),
body('title', 'Title cannot be empty or less than 2 characters').isLength({min: 2}).notEmpty().trim().escape(),
body('where', 'Where cannot be empty or less than 2 characters').isLength({min: 2}).notEmpty().trim().escape(),
body('when', 'When cannot be empty').notEmpty().trim().escape(),
body('start', 'Start time cannot be empty').notEmpty().trim().escape(),
body('end', 'End time cannot be empty').notEmpty().trim().escape(),
body('details', 'Details cannot be less than 10 characters').isLength({min: 10}).trim().escape(),
body('image', 'Image URL cannot be empty ').notEmpty()];