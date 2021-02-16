const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const NewsCardController = require('./controllers/NewsCardController');

routes.get('/newscards/:id', NewsCardController.findIndex);
routes.get('/newscards', NewsCardController.index);
routes.put(
  '/newscards/:id',
  multer(multerConfig).single('image'),
  NewsCardController.update
);
routes.post(
  '/newscards',
  multer(multerConfig).single('image'),
  NewsCardController.create
);
routes.delete('/newscards/:id', NewsCardController.delete);

module.exports = routes;
