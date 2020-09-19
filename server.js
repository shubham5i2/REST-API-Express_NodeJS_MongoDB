const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mainRouter = require("./routes/mainRoute");

const app = express();

//Database connectivity start
mongoose.connect("mongodb://localhost:27017/EmployeeDetails", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection
  .once("open", () => console.log("Connected to database"))
  .on("error", (error) => {
    console.log("Error in connecting", error);
  });
//Database connectivity end

app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/employees", mainRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
