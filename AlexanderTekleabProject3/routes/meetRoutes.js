const express = require('express');
const router = express.Router();
const controller = require('../controllers/meetController');


// GET /stories: send all stories to the user
router.get('/', controller.connections);


// GET /stories/new: send html form for creating new story
router.get('/new', controller.new);


// POST /stories: create a new story
router.post('/', controller.create);


// GET /stories/:id: send details of story identified by id
router.get('/:id', controller.show);

// GET /stories/:id/edit: send html form for editing an existing story
router.get('/:id/edit', controller.edit);

// PUT /stories/:id: update the story identified by story
router.put('/:id', controller.update);

// DELETE /stories/:id: delete story identified by id
router.delete('/:id', controller.delete);


module.exports = router;