const express = require('express');
const router = express.Router();
const training = require('../controllers/training.controller');

    // Create a new Note
    router.post('/addTraining', training.create);

    // Retrieve all training
    router.get('/alltraining', training.findAll);

    // Update a Note with noteId
    router.put('/updateTraining/:id', training.update);

    // Delete a Note with noteId
    router.delete('/deleteTraining/:id', training.delete);

module.exports = router;