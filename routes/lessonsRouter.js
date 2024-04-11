const express = require('express');
const router = express.Router();

const LessonsService = require('./../services/lessonsService');
const service = new LessonsService();

router.get('/', (req, res) => {
  const lessons = service.find();
  res.json(lessons);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const lesson = service.findOne(id);
  res.json(lesson);
});

module.exports = router;
