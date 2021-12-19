const model = require('../models/meet');
const rsvpModel = require('../models/rsvp');

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
    let user = req.session.user;

    Promise.all([model.findById(id).populate('author', 'firstName lastName'), rsvpModel.count({meet:id, rsvp:"YES"})])
    .then(results => {
        console.log(results);
        const [meet, rsvps] = results;
        if (meet) {
            res.render('./meet/show', {meet, user, rsvps});
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
    let user = req.session.user;
    if(user) {
        let id = req.params.id;
    Promise.all([model.findByIdAndDelete(id, {useFindAndModify: false}), rsvpModel.deleteMany({meet:id})])
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
    }
};

exports.editRsvp = (req, res, next) => {
    let id = req.params.id;
    rsvpModel.findOne({meet:id, user:req.session.user})
    .then(rsvp => {
        if (rsvp) {
            //update
            rsvpModel.findByIdAndUpdate(rsvp._id, {rsvp:req.body.rsvp}, {useFindAndModify: false, runValidators: true})
            .then(rsvp => {
                req.flash('success', 'You have successfully updated your RSVP!');
                res.redirect('/users/profile');

            })
            .catch(err => {
                console.log(err);
                if(err.name === 'VlidationError') {
                    req.flash('error', err.message);
                    return res.redirect('back');
                }
                next(err);
            });

        } else {
            //create
            let rsvp = new rsvpModel({
                meet: id,
                rsvp: req.body.rsvp,
                user: req.session.user
            });
            rsvp.save()
            .then(rsvp => {
                req.flash('success', 'RSVP successfully created!');
                res.redirect('/users/profile');
            })
            .catch(err => {
                req.flash('error', err.message);
                next(err);

            });
        }

    })

}


exports.deleteRsvp = (req, res, next) => {
    let id = req.params.id;
    rsvpModel.findOneAndDelete({meet:id, user:req.session.user})
    .then(tsvp => {
        req.flash('success', 'RSVP successfully deleted!');
        res.redirect('/users/profile');
    })
    .catch(err => {
        req.flash('error', err.message);
        next(err);
    })
}

