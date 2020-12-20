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

    await connection('news_cards')
      .where('id', id)
      .delete()
      .then((result) => {
        return res.json({ success: true, result });
      });
  },
};
