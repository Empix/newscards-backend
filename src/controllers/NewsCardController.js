const fs = require('fs/promises');
const path = require('path');

const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const newscards = await connection('news_cards').select('*');

    return res.json(newscards);
  },

  async create(req, res) {
    const { title, author, url, description } = req.body;
    const { filename } = req.file;

    await connection('news_cards')
      .insert({
        title,
        author,
        url,
        description,
        image_url: `${process.env.APP_URL}/images/${filename}`,
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
