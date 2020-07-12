const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const palette = require("./api/palette");
const GetPalette = require("./api/colorhunt");
try {
  require("dotenv").config();
} catch {
  console.log("not loading dotenv");
}

app.use(cors());
app.use(helmet());
app.get("/", (req, res) => {
  res.status(200).send("OK");
});
app.get("/palettes/ch/:number", (req, res) => {
  // return HTML color codes
  const ch = { url: "error" };
  const n = Number(req.params.number);
  if (n > 0) {
    ch.url = `${process.env.CHP_URL}${n}`;
  }
  // result contains possibly valid url. check if db record exists
  palette
    .find({ id: n })
    .then((existing) => {
      // try to find in db
      existing && existing.id === n
        ? res.status(200).json(existing) // return existing record
        : GetPalette({ id: n, result: ch, palette }); // fetch from url
    })
    .catch((err) => {
      // console.log(err);
      console.log("catch");
      GetPalette({ id: n, result: ch, palette, res }); // fetch from url
    }); // end pallete.find
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening @ ${PORT}`));
