const knex = require("../database/connection");

function upsert({ table, record }) {
  return knex.raw(
    knex(table).insert(record).toQuery() +
      ' ON CONFLICT ("number") DO NOTHING RETURNING *;'
  );
}

module.exports = upsert;
