const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Employee.find().populate('department'));
    }
    catch (error) {
        res.status(500).json(error);
    }
}

exports.getRandomEmployee = async (req, res) => {
    try {
        const count = await Employee.countDocuments();
        const rand= Math.floor(Math.random() * count);
        const employee = await Employee.findOne().skip(rand).populate('department');
        if(!employee) res.status(404).json({ message: 'Not found' });
        else res.json(employee);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('department');
        if(!employee) res.status(404).json({ message: 'Not found' });
        else res.json(employee);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

exports.updateEmployee = async (req, res) => {
    const { firstName, lastName } = req.body;
    try {
        const employee = await Employee.findById(req.params.id);
        if(employee) {
            await Employee.updateOne({ _id: req.params.id }, { $set: { firstName: firstName, lastName: lastName } });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }

}

exports.addEmployee = async (req, res) => {
    try {
        const { firstName, lastName, department } = req.body;
        const newEmployee = new Employee({firstName, lastName, department});
        await newEmployee.save();
        res.json({message: 'Employee added successfully.'});
    }
    catch (error) {
        res.status(500).json(error);
    }
}

exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if(employee) {
            await Employee.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
}