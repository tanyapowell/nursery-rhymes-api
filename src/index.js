require("dotenv").config();

const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const rhymesFilePath = process.env.BASE_JSON_PATH;
const rhymesAbsoluteFilePath = __dirname + rhymesFilePath;
const PORT = 8080;

//Read rhymes from rhymes.json into variable
const rhymes = require(rhymesAbsoluteFilePath);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(bodyParser.json());

app.use("/content", express.static(path.join(__dirname, "public")));

app.get("/", (_, res) => {
  res.header("Content-Type", "application/html");
  res.sendFile("./public/index.html", { root: __dirname });
  res.status(200).end();
});

app.get("/rhymes", (_, res) => {
  res.header("Content-Type", "application/json");
  res.status(200);
  res.sendFile(rhymesFilePath, { root: __dirname });
});

app.get("/rhymes/:id", (req, res) => {
  const id = req.params.id;
  const foundRhyme = rhymes.find((rhyme) => rhyme.id == id);

  if (foundRhyme) {
    res.header("Content-Type", "application/json");
    res.status(200);
    res.send(foundRhyme);
  } else {
    res.status(404).end();
  }
});

app.post("/rhymes", (req, res) => {
  const newRhyme = req.body;
  const newRhymesArray = [...rhymes, newRhyme];

  fs.writeFileSync(rhymesAbsoluteFilePath, JSON.stringify(newRhymesArray));

  res.send("Success 🌟. Happy Rhyming");
  res.status(201).end();
});

app.delete("/rhymes/:id", (req, res) => {
  const id = req.params.id;
  const updatedRhymes = rhymes.filter((rhyme) => rhyme.id != id);

  fs.writeFileSync(rhymesAbsoluteFilePath, JSON.stringify(updatedRhymes));

  res.status(202).end();
});

app.listen(PORT, function () {
  console.log(`Node server is running... http://localhost:${PORT}`);
});

module.exports = app;
