const express = require('express');
const router = express.Router();

const StudentsService = require('./../services/studentsService');
const service = new StudentsService();

const validatorHandler = require('../middlewares/validatorHandler');
const {
  createStudentsSchema,
  updateStudentsSchema,
  getStudentsSchema,
} = require('./../schemas/studentsSchema');

router.get('/', async (req, res) => {
  const students = await service.find();
  res.json(students);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filtro');
});

router.get(
  '/:id',
  validatorHandler(getStudentsSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const student = await service.findOne(id);
      res.json(student);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createStudentsSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newStudent = await service.create(body);
    res.status(201).json(newStudent);
  },
);

router.patch(
  '/:id',
  validatorHandler(getStudentsSchema, 'params'),
  validatorHandler(updateStudentsSchema, 'body'),
  async (req, res, next) => {
    try {
      //Patch es para actualizar 1 o 2
      const { id } = req.params;
      const body = req.body;
      const student = await service.update(id, body);
      res.json(student);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const ans = await service.delete(id);
  res.json(ans);
});

module.exports = router;
