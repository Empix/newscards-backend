const fs = require('fs/promises');
const path = require('path');

const connection = require('../database/connection');

module.exports = {
  async findIndex(req, res) {
    const { id } = req.params;

    const newscard = await connection('news_cards')
      .select('*')
      .where({ id })
      .first();

    return res.json(newscard);
  },

  async index(req, res) {
    let { search = '', page = 1 } = req.query;

    page = page < 1 ? 1 : page;
    const limit = 9;

    const newscards = await connection('news_cards')
      .select('*')
      .where('title', 'like', `%${search}%`)
      .orWhere('author', 'like', `%${search}%`)
      .orWhere('description', 'like', `%${search}%`)
      .orderBy('id', 'desc')
      .limit(limit)
      .offset(limit * (page - 1));

    const [count] = await connection('news_cards')
      .count('id as total')
      .where('title', 'like', `%${search}%`)
      .orWhere('author', 'like', `%${search}%`)
      .orWhere('description', 'like', `%${search}%`);

    const data = {
      data: newscards,
      currentPage: page,
      totalPages: Math.ceil(count.total / limit),
    };

    return res.json(data);
  },

  async create(req, res, next) {
    const { title, author, url, description } = req.body;
    const { file } = req;

    if (!title || !author || !url || !description || !file) {
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

  async update(req, res) {
    const { title, author, url, description } = req.body;
    const { file } = req;
    const { id } = req.params;

    if (!title || !author || !url || !description) {
      const error = new Error('Fields incorrectly filled');
      error.status = 400;

      return next(error);
    }

    const data = {
      title,
      author,
      url,
      description,
    };

    if (file) {
      const { image_url } = await connection('news_cards')
        .where({ id })
        .select('image_url')
        .first();

      const imageName = image_url.split('images/')[1];

      await fs.unlink(
        path.resolve(__dirname, '..', '..', 'uploads', imageName)
      );

      data.image_url = `${process.env.APP_URL}/images/${file.filename}`;
    }

    await connection('news_cards')
      .update(data)
      .where({ id })
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
