const express = require('express');
const router = express.Router();
const controller = require('../controllers/meetController');
const {isLoggedIn, isAuthor} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');


// GET /connections: send all meets to the user
router.get('/', controller.connections);


// GET /connections/new: send html form for creating new meet
router.get('/new', isLoggedIn, controller.new);


// POST /connections: create a new meet
router.post('/', isLoggedIn, controller.create);


// GET /connections/:id: send details of meet identified by id
router.get('/:id', validateId, controller.show);

// GET /connections/:id/edit: send html form for editing an existing meet
router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);

// PUT /connections/:id: update the meet identified by id
router.put('/:id', validateId, isLoggedIn, isAuthor, controller.update);

// DELETE /connections/:id: delete meet identified by id
router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);


module.exports = router;