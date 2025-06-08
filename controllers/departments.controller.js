const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Department.find({}));
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};
exports.getRandom = async (req, res) => {

    try {
        const count = await Department.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const dep = await Department.findOne().skip(rand);
        if(!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }

};
exports.getDepartmentById = async (req, res) => {

    try {
        const dep = await Department.findById(req.params.id);
        if(!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }

};
exports.AddDepartment = async (req, res) => {
    try {
        const {name} = req.body;
        const newDepartment = new Department({name: name});
        await newDepartment.save();
        res.json({message: 'Department saved'});
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
exports.UpdateDepartment = async (req, res) => {
    const { name } = req.body;

    try {
        const dep = await Department.findById(req.params.id);
        if(dep) {
            const updated = await Department.findByIdAndUpdate(req.params.id, { $set: { name: name }}, {new: true});
            res.json(updated);
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }

};
exports.DeleteDepartment = async (req, res) => {
    try {
        const dep = await Department.findByIdAndDelete(req.params.id);
        if(dep) {
            res.json(dep);
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }

};