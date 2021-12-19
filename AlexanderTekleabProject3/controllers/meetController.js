const model = require('../models/meet');

exports.connections = (req, res, next) => {
    model.find()
    .then(meets => { 
        let topics = model.getTopics(meets)
        res.render('./meet/connections', {meets, topics})})
    .catch(err => next(err));
};

exports.new = (req, res) => {
    res.render('./meet/newConnection');
};

exports.create = (req, res, next) => {

        let meet = new model(req.body); // create a new meet document
        meet.save() // insert the document to the database
        .then((meet) => res.redirect('/connections'))
        .catch(err => {
            if (err.name === 'ValidationError'){
                err.status = 400;
            }
            next(err);
        });
    };


exports.show = (req, res, next) => {
    let id = req.params.id;
    // an objectId is a 24-bit Hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid meet id');
        err.status = 400;
        return next(err);

    }
    model.findById(id)
    .then(meet => {
        if (meet) {
            res.render('./meet/show', {meet});
        } else {
            let err = new Error('Cannot find a meet with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));  
};


exports.edit = (req, res, next) => {
    let id = req.params.id;
    // an objectId is a 24-bit Hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid meet id');
        err.status = 400;
        return next(err);

    }
    model.findById(id)
    .then(meet => {
        if (meet) {
            return res.render('./meet/edit', {meet});
        } else {
            let err = new Error('Cannot find a meet with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err)); 

};



exports.update = (req, res, next) => {
    let meet = req.body;
    let id = req.params.id;

        // an objectId is a 24-bit Hex string
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            let err = new Error('Invalid meet id');
            err.status = 400;
            return next(err);
    
        }

        model.findByIdAndUpdate(id, meet, {useFindAndModify: false, runValidators: true})
        .then(meet => {
            if (meet) {
                res.redirect('/connections/'+id);
            } else {
                let err = new Error('Cannot find a meet with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError')
            err.status  = 400;
            next(err)
        });
};



exports.delete = (req, res, next) => {
    let id = req.params.id;

    // an objectId is a 24-bit Hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);

    }

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then (meet => {
        if (meet) {
            res.redirect('/connections');
        } else {
            let err = new Error('Cannot find a meet with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

