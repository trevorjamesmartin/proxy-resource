const express = require("express");
const cors = require("cors");
const request = require("request");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("OK");
});
app.get("/colorHunt/palette/:number", (req, res) => {
  // return HTML color codes
  const palette = req.params.number;
  const result = { url: "error" };
  try {
    const n = Number(palette);
    if (n > 0) {
      result.url = `https://colorhunt.co/palette/${n}`;
    }
  } catch {
    console.log("error");
  }
  request(result, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      return res.status(500).json({ type: "error", message: err.message });
    }
    const txt = body
      .split("\n")
      .filter((line) => line.match(/itemer/))
      .map((i) => i.split(";")[0])[0]
      .split(",")[2]
      .replace(" ", "");
    const colorString = txt.replace(/[^a-z0-9]/gi, "");
    const colorOne = `#${colorString.substring(0, 6)}`;
    const colorTwo = `#${colorString.substring(6, 12)}`;
    const colorThree = `#${colorString.substring(12, 18)}`;
    const colorFour = `#${colorString.substring(18)}`;
    const origin = result.url;
    res.status(200).json({ origin, colorOne, colorTwo, colorThree, colorFour });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening @ ${PORT}`));
