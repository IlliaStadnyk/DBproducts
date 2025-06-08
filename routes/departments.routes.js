const express = require('express');
const router = express.Router();
const Department = require("../models/department.model");
const DepartmentController = require("../controllers/departments.controller.js");

router.get('/departments', DepartmentController.getAll);
router.get('/departments/random', DepartmentController.getRandom);
router.get('/departments/:id', DepartmentController.getDepartmentById);
router.post('/departments', DepartmentController.AddDepartment);
router.put('/departments/:id', DepartmentController.UpdateDepartment);
router.delete('/departments/:id', DepartmentController.DeleteDepartment);

module.exports = router;
