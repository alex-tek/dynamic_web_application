const Meet = require('../models/meet');

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