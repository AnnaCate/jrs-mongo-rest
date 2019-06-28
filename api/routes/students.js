const express = require('express');
const Student = require('../models/Student');
const router = express.Router();

// /students/
router
  .route('/')
  .get(async (req, res) => {
    await Student.find({}).then(students =>
      res.json({status: 'ok', data: students})
    );
  })
  .post(async (req, res) => {
    const rawStudent = req.body;
    const newStudent = await new Student(rawStudent);

    newStudent.save();

    res.json({status: 'ok', newStudent});
  });

// /students/:studentId
router
  .route('/:studentId')
  .get(async (req, res) => {
    await Student.findById(req.params.studentId).then(foundStudent =>
      res.json(foundStudent)
    );
  })
  .put(async (req, res) => {
    await Student.findById(req.params.studentId).then(foundStudent => {
      foundStudent.name = req.body.name;
      foundStudent.age = req.body.age;
      foundStudent.photoUrl = req.body.photoUrl;
      foundStudent.bio = req.body.bio;

      foundStudent.save();

      res.json(foundStudent);
    });
  })
  .delete(async (req, response) => {
    await Student.findByIdAndDelete(req.params.studentId).then(res => {
      response.json({status: 'ok', res: req.params.studentId});
    });
  });

module.exports = router;
