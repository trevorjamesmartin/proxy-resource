const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const router = require("./api");
const { Server } = require("http");
const app = express();

try {
  require("dotenv").config();
} catch {
  console.log("not loading dotenv");
}

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/palettes", router);
app.get("/", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening @ ${PORT}`));
