const express = require('express');
const studentsRouter = require('./studentsRouter');
const qualificationsRouter = require('./qualificationsRouter');
const lessonsRouter = require('./lessonsRouter');

function routerApi(app){
  //Definiendo EndPoints
  const router = express.Router();
  app.use('/api/v1', router); //Ruta maestra

  router.use('/students', studentsRouter);
  router.use('/qualifications', qualificationsRouter);
  router.use('/lessons', lessonsRouter);
}

module.exports = routerApi;
