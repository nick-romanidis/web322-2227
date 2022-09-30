const express = require("express");
const router = express.Router();
const employeeList = require("../models/employee-list");

router.get("/", (req, res) => {
    res.render("employees/list", {
        employees: employeeList.getAllEmployees()
    });
});

router.get("/visible", (req, res) => {
    res.render("employees/list", {
        employees: employeeList.getVisibleEmployees()
    });
});

module.exports = router;