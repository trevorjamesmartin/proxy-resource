const db = require("../database/connection");

function find({ id }) {
  return db("palette").where({ id }).first();
}

function findAll() {
  return db("palette");
}

function add(palette) {
  return db("palette").insert(palette, "id");
}

function remove(id) {
  return db("palette").del().where({ id });
}

function update(palette, id) {
  return db("palette")
    .where({ id })
    .first()
    .then((details) => {
      return { ...details, ...palette };
    })
    .then((result) => {
      db("palette").update(result, "palette").where({ number });
    });
}

module.exports = { find, add, remove, update, findAll };
