const express = require('express');
const routes = express.Router();
const ongsController = require('./controllers/OngsController');
const incidentsController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

routes.get('/ongs', ongsController.index);
routes.post('/ongs', ongsController.create);
routes.get('/incidents', incidentsController.index);
routes.post('/incidents', incidentsController.create);
routes.delete('/incidents/:id', incidentsController.delete);
routes.get('/profile', profileController.index);
routes.post('/login', sessionController.login);

module.exports = routes;
