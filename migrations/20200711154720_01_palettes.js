exports.up = function (knex) {
  return knex.schema.createTable("palette", (tbl) => {
    tbl.integer("id").primary(); // do not auto-increment.
    tbl.string("colors", 255);
    tbl.string("origin", 255);
  });
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("palette");
};
