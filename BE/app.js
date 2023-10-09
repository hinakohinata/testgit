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
  origin: ["http://localhost:3000", "http://localhost:3000/*","http:*"],
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});


const user = require("./controllers/user.controller");
app.use("/user", user);
const positions = require("./controllers/positions.controller");
app.use("/positions", positions);
const checkin = require("./controllers/checkin.controller");
app.use("/checkin", checkin);
const attendance = require("./controllers/attendance.controller");
app.use("/attendance", attendance);
const assignment = require("./controllers/assignment.controller");
app.use("/assignment", assignment);
const assignmentStudent = require("./controllers/assignmentStudent.controller");
app.use("/assignmentStudent", assignmentStudent);
const student = require("./controllers/student.controller");
app.use("/student", student);
const evaluation = require("./controllers/evaluation.controller");
app.use("/evaluation", evaluation);
const fee_type = require("./controllers/feeType.controller");
app.use("/fee_type", fee_type);
const fee_collection = require("./controllers/feeCollection.controller");
app.use("/fee_collection", fee_collection);
const expense = require("./controllers/expense.controller");
app.use("/expense", expense);
const room = require("./controllers/room.controller");
app.use("/room", room);
const other = require("./controllers/other.controller");
app.use("/other", other);

app.listen(port, () => {
  console.log(`Example ${port}`);
});
