const express = require("express");

const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const port = 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3000/*"],
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});


const books = require("./controllers/books.controller");
app.use("/books", books);

const bookTypes = require('./router/bookTypesRouter');
app.use('/bookTypes', bookTypes);

const authorRouter = require('./router/author.router');
app.use('/authors', authorRouter);

const user = require("./controllers/user.controller");
app.use("/user", user);

app.listen(port, () => {
  console.log(`Example ${port}`);
});
