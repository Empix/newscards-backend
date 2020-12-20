const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const newscards = await connection('news_cards').select('*');

    return res.json(newscards);
  },

  async create(req, res) {
    const { title, author, link, description, image_id } = req.body;

    await connection('news_cards')
      .insert({
        title,
        author,
        link,
        description,
        image_id,
      })
      .then((result) => {
        return res.json({ success: true });
      });
  },
};
