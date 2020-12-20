exports.up = function (knex) {
  return knex.schema.createTable('news_cards', (table) => {
    table.increments('id');

    table.string('title').notNullable();
    table.string('author');
    table.string('url').notNullable();
    table.string('image_url').notNullable();
    table.text('description').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('news_cards');
};
