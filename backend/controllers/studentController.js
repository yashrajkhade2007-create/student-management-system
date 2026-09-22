const Student = require('../models/students');

// 1. Get All Students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Add New Student
exports.addStudent = async (req, res) => {
    const { name, email, rollNo, class: studentClass } = req.body;
    try {
        const newStudent = new Student({ name, email, rollNo, class: studentClass });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 3. Delete Student
exports.deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
