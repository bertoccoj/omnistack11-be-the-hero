const express = require('express');
const routes = express.Router();
const ongsController = require('./controllers/OngsController');
const incidentsController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');
const { celebrate, Joi, Segments } = require('celebrate');

// ongs
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(13),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  }),
}), ongsController.create);

routes.get('/ongs', ongsController.index);

// incidents
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}),incidentsController.index);

routes.post('/incidents', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().length(8),
  }).unknown(),
}), incidentsController.create);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().length(8),
  }).unknown(),
}), incidentsController.delete);

// profile
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().length(8),
  }).unknown(),
}), profileController.index);

// login
routes.post('/login', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required().length(8),
  }),
}), sessionController.login);

module.exports = routes;
