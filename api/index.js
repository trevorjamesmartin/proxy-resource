const router = require("express").Router();
const palette = require("./palette");
const GetPalette = require("./colorhunt");
router.get("/ch/:number", (req, res) => {
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
        : GetPalette({ id: n, result: ch, palette, res }); // fetch from url
    })
    .catch((err) => {
      // console.log(err);
      console.log("catch from find");
      GetPalette({ id: n, result: ch, palette, res }); // fetch from url
    }); // end pallete.find
});
module.exports = router;
