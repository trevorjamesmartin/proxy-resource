exports.up = function (knex) {
  return knex.schema.createTable("palette", (tbl) => {
    tbl.increments();
    tbl.string("colors", 255);
    tbl.string("origin", 255);
    tbl.integer("number").unsigned();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("palette");
};
