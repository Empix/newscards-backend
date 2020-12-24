const fs = require('fs/promises');
const path = require('path');

const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const newscards = await connection('news_cards').select('*');

    return res.json(newscards);
  },

  async create(req, res, next) {
    const { title, author, url, description } = req.body;
    const { file } = req;

    if (!title || !url || !description || !file) {
      const error = new Error('Fields incorrectly filled');
      error.status = 400;

      return next(error);
    }

    await connection('news_cards')
      .insert({
        title,
        author,
        url,
        description,
        image_url: `${process.env.APP_URL}/images/${file.filename}`,
      })
      .then((result) => {
        return res.json({ success: true });
      });
  },

  async delete(req, res) {
    const { id } = req.params;

    const { image_url } = await connection('news_cards')
      .where('id', id)
      .select('image_url')
      .first();

    const imageName = image_url.split('images/')[1];

    await fs.unlink(path.resolve(__dirname, '..', '..', 'uploads', imageName));

    await connection('news_cards')
      .where('id', id)
      .delete()
      .then((result) => {
        return res.json({ success: true });
      });
  },
};
