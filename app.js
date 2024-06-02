const express = require("express");
const bodyParser = require("body-parser");
const { add, subtract, multiply, divide } = require("./arithmetic"); // Importing functions from arithmetic.js
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Route handlers
app.get("/add", (req, res) => {
  res.sendFile("./views/add.html", { root: __dirname });
});

app.get("/subtract", (req, res) => {
  res.sendFile("./views/subtract.html", { root: __dirname });
});

app.get("/multiply", (req, res) => {
  res.sendFile("./views/multiply.html", { root: __dirname });
});

app.get("/divide", (req, res) => {
  res.sendFile("./views/divide.html", { root: __dirname });
});

// Arithmetic operations

const handleOperation = (req, res, operation) => {
  try {
    const n1 = parseFloat(req.body.n1);
    const n2 = parseFloat(req.body.n2);
    if (isNaN(n1)) {
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      throw new Error("n2 incorrectly defined");
    }

    if (n1 === NaN || n2 === NaN) {
      console.log();
      throw new Error("Parsing Error");
    }

    let result;
    switch (operation) {
      case "add":
        result = add(n1, n2);
        break;
      case "subtract":
        result = subtract(n1, n2);
        break;
      case "multiply":
        result = multiply(n1, n2);
        break;
      case "divide":
        if (n2 === 0) {
          throw new Error("n2 should not be zero");
        }
        result = divide(n1, n2);
        break;
      default:
        throw new Error("Invalid operation");
    }

    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
};

app.post("/add", (req, res) => {
  handleOperation(req, res, "add");
});

app.post("/subtract", (req, res) => {
  handleOperation(req, res, "subtract");
});

app.post("/multiply", (req, res) => {
  handleOperation(req, res, "multiply");
});

app.post("/divide", (req, res) => {
  handleOperation(req, res, "divide");
});

const port = 3040;
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});

module.exports = app;
