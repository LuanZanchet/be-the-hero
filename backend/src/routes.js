const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const {celebrate,Segments, Joi} = require('celebrate');

const routes = express.Router();

routes.use(express.json());

routes.post('/ongs', OngController.create)

routes.post('/sessions', SessionController.index)

routes.get('/profile', celebrate({
    [Segments.HEADERS]:Joi.object({
        authorization: Joi.string().required()} ).unknown()
}), ProfileController.index)

routes.get('/ongs', OngController.index)
routes.post('/ongs', celebrate({
    [Segments.BODY]:Joi.object().keys({
        name: Joi.string().required(),
        email:Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().length(2),
    })
}), OngController.create)

routes.post('/incidents', IncidentController.create)
routes.get('/incidents',
celebrate({
   [Segments.QUERY]:Joi.object().keys({
       page: Joi.number()
   })
}), IncidentController.index)
routes.delete('/incidents/:id',
 celebrate({
    [Segments.QUERY]:Joi.object().keys({
        id: Joi.number().required()
    })
}),IncidentController.delete)



module.exports = routes;