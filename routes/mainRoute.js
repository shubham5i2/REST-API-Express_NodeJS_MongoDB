const express = require("express");
const router = express.Router();
const Employee = require("../model/employee-model");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/list", async (req, res) => {
  try {
    const employee = await Employee.find();
    res.render("employees/list", { employee: employee });
  } catch (error) {
    console.log(error);
  }
});

router.get("/edit/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.render("employees/edit", { employee: employee });
});

router.post("/", async (req, res) => {
  var employee = new Employee({
    fullname: req.body.fullname,
    age: req.body.age,
    gender: req.body.gender,
    email: req.body.email,
    city: req.body.city,
    country: req.body.country,
  });
  try {
    if (
      parseInt(employee.age) < 1 ||
      parseInt(employee.age) > 100 ||
      isNaN(parseInt(employee.age))
    ) {
      const errorMeassage = "** Age should be a NUMBER between 1 to 100 **";
      res.render("employees/add", {
        employee: employee,
        errorMeassage: errorMeassage,
      });
    } else {
      employee = await employee.save();
      res.redirect("employees/list");
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  let employee;
  try {
    employee = await Employee.findById(req.params.id);
    employee.fullname = req.body.fullname;
    employee.age = req.body.age;
    employee.gender = req.body.gender;
    employee.email = req.body.email;
    employee.city = req.body.city;
    employee.country = req.body.country;
    employee.save();
    res.redirect("/employees/list");
  } catch (error) {
    if (employee) {
      res.redirect("/employees");
    }
    console.log(error);
  }
  // res.send("Edited");
});

router.delete("/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect("/employees/list");
});

module.exports = router;
