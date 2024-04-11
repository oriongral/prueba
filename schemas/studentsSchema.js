const Joi = require('joi');

const id = Joi.string()
  .regex(/^[0-9]+$/)
  .message('El id debe ser númerico');
const name = Joi.string()
  .regex(/^[A-ZÑÁÉÍÓÚ]{3,35}$/) // Solo permite letras mayúsculas sin acentos ni números
  .message(
    'Solo se permiten letras mayúsculas sin números, mínimo 3 caracteres y máximo 35',
  );
const gender = Joi.string().valid('male', 'female');

const createStudentsSchema = Joi.object({
  name: name.required(),
  gender: gender.required(),
});

const updateStudentsSchema = Joi.object({
  name: name,
  gender: gender,
});

const getStudentsSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createStudentsSchema,
  updateStudentsSchema,
  getStudentsSchema,
};
