const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

// Create Project
router.post('/submit', async (req, res) => {
  try {
    const { studentNames, projectName, year, semester, section } = req.body;

    if (studentNames.length !== 4) {
      return res.status(400).json({ message: "Exactly 4 student names are required." });
    }

    const newProject = new Project({ studentNames, projectName, year, semester, section });
    await newProject.save();

    res.status(201).json({ message: "Project Submitted Successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
