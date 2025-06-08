const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employees.controller');
router.get('/employees', EmployeeController.getAll);

router.get('/employees/random', EmployeeController.getRandomEmployee);

router.get('/employees/:id', EmployeeController.getEmployeeById);

router.post('/employees', EmployeeController.addEmployee);

router.put('/employees/:id', EmployeeController.updateEmployee);

router.delete('/employees/:id', EmployeeController.deleteEmployee);

module.exports = router;
