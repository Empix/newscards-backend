const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const NewsCardController = require('./controllers/NewsCardController');

routes.get('/newscards', NewsCardController.index);
routes.post(
  '/newscards',
  multer(multerConfig).single('image'),
  NewsCardController.create
);
routes.delete('/newscards/:id', NewsCardController.delete);

module.exports = routes;
