const model = require('../models/meet');

exports.connections = (req, res) => {
    let meets = model.find();
    let topics = model.getTopics();
    //console.log(meets);
    //console.log(topics);
    res.render('./meet/connections', { meets: meets, topics: topics });
}

exports.new = (req, res) => {
    res.render('./meet/newConnection');
}

exports.create = (req, res) => {
    let meet = req.body;
    model.save(meet);
    res.redirect('/connections');
}

exports.show = (req, res, next) => {
    let id = req.params.id;
    let meet = model.findById(id);

    if (meet) {
        res.render('./meet/show', { meet: meet });

    } else {
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
}

exports.edit = (req, res, next) => {
    // res.send('send the edit form');
    let id = req.params.id;
    let meet = model.findById(id);

    if (meet) {
        res.render('./meet/edit', { meet });

    } else {
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
}

exports.update = (req, res, next) => {
    let meet = req.body;
    let id = req.params.id;

    if (model.updateById(id, meet)) {
        res.redirect('/connections');
    } else {
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }

}

exports.delete = (req, res, next) => {
    let id = req.params.id;

    if (model.deleteById(id)) {
        res.redirect('/connections');

    } else {
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
}