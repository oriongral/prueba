const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    course: 'Matemáticas',
    qualification: 10,
  });
});

router.get('/:enrolledId/periods/:periodId', (req, res) => {
  const { enrolledId, periodId } = req.params;
  res.json({
    enrolledId,
    periodId,
  });
});

module.exports = router;
