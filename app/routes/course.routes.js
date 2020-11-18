const express = require('express');
const router = express.Router();
const courses = require('../controllers/courses.controller');

    // Create a new Note
    router.post('/addCourses', courses.create);

    // Retrieve all courses
    router.get('/allCourses', courses.findAll);

    // Update a Course
    router.put('/updateCourse/:courseId', courses.update);

    // Delete a Note with noteId
    router.delete('/deleteCourse/:courseId', courses.delete);

module.exports = router;