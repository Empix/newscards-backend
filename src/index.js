require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/images', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    error.status = 400;
  }

  return res.status(error.status || 500).json({ error: error.message });
});

app.listen(process.env.PORT || 3333);
