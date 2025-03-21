const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  studentNames: [String], // Array of 4 student names
  studentRollNo: [String],
  projectName: String,
  year: String,
  semester: String,
  section: String,
});

module.exports = mongoose.model('Project', ProjectSchema);
