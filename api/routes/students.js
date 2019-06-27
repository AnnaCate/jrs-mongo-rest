const express = require('express');
const Student = require('../models/Student');
const router = express.Router();

// /students/
router
  .route('/')
  .get((req, res) => {
    Student.find({}).then(students => res.json({status: 'ok', data: students}));
  })
  .post((req, res) => {
    const rawStudent = req.body;
    const newStudent = new Student(rawStudent);

    newStudent.save();

    res.json({status: 'ok', newStudent});
  });

// /students/:studentId
router
  .route('/:studentId')
  .get((req, res) => {
    Student.findById(req.params.studentId).then(foundStudent =>
      res.json(foundStudent)
    );
  })
  .put((req, res) => {
    Student.findById(req.params.studentId).then(foundStudent => {
      foundStudent.name = req.body.name;
      foundStudent.age = req.body.age;
      foundStudent.photoUrl = req.body.photoUrl;
      foundStudent.bio = req.body.bio;

      foundStudent.save();

      res.json(foundStudent);
    });
  })
  .delete((req, response) => {
    Student.findByIdAndDelete(req.params.studentId).then(res => {
      response.json({status: 'ok', res: req.params.studentId});
    });
  });

module.exports = router;
