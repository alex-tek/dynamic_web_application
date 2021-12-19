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
        meet.author = req.session.user;
        meet.save() // insert the document to the database
        .then((meet) => res.redirect('/connections'))
        .catch(err => {
            if (err.name === 'ValidationError'){
                console.log(err);
                
                err.status = 400;
                req.flash('error', 'Every field is required');
                res.redirect('/connections/new')
            }
            
        });
    };


exports.show = (req, res, next) => {
    let id = req.params.id;

    model.findById(id).populate('author', 'firstName lastName')
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
            nreq.flash('error', 'Every field is required');
            res.redirect('/connections/new')
        });
};



exports.delete = (req, res, next) => {
    let id = req.params.id;


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

