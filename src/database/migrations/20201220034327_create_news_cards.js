exports.up = function (knex) {
  return knex.schema.createTable('news_cards', (table) => {
    table.increments('id');

    table.string('title').notNullable();
    table.string('author');
    table.string('link').notNullable();
    table.text('description').notNullable();

    table.integer('image_id').unsigned().notNullable();
    table.foreign('image_id').references('id').inTable('images');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('news_cards');
};
