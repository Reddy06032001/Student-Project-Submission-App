const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// Create Project
router.post("/submit", async (req, res) => {
  try {
    const {
      studentNames,
      studentRollNo,
      projectName,
      year,
      semester,
      section,
    } = req.body;

    if (studentNames.length !== 4) {
      return res
        .status(400)
        .json({ message: "Exactly 4 student names are required." });
    }
    if (studentRollNo.length !== 4) {
      return res
        .status(400)
        .json({ message: "Exactly 4 student Roll Numbers are required." });
    }

    // Check if any studentRollNo already exists
    const existingProject = await Project.findOne({
      studentRollNo: { $in: studentRollNo },
    });
    if (existingProject) {
      return res
        .status(400)
        .json({ message: "One or more student Roll Numbers already exist." });
    }

    const newProject = new Project({
      studentNames,
      studentRollNo,
      projectName,
      year,
      semester,
      section,
    });
    await newProject.save();

    res.status(201).json({ message: "Project Submitted Successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
