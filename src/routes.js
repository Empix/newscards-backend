const routes = require('express').Router();

const NewsCardController = require('./controllers/NewsCardController');

routes.get('/newscards', NewsCardController.index);
routes.post('/newscards', NewsCardController.create);

module.exports = routes;
