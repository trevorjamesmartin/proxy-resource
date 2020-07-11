const db = require("../database/connection");

function find({ number }) {
  return db("palette").where({ number }).first();
}

function add(palette) {
  return db("palette").insert(palette, "id");
}

function remove(id) {
  return db("palette").del().where({ id });
}

function update(palette, number) {
  return db("palette")
    .where({ number })
    .first()
    .then((details) => {
      return { ...details, ...palette };
    })
    .then((result) => {
      db("palette").update(result, "palette").where({ number });
    });
}

module.exports = { find, add, remove, update };
