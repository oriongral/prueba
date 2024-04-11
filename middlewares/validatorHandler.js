const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error)); // se ejecuta el middleware de error.
    }
    next(); // si no hay error, continua con el siguiente middleware o controlador.
  };
}

module.exports = validatorHandler;
