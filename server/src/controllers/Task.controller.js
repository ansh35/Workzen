const mongoose = require("mongoose");
const Task = require("../models/Task.model.js");

//Admin 
exports.CreateTask = async (req , res)=> {
    try{
        const {
            title,
            description,
            project,
            assignedTo,
            priority,
            status,
            deadline,
    }= req.body;

    const task = await Task.create({
        title,
        description,
        project,
        assignedTo,
        priority : priority?.toLowerCase(),
        status : status?.toLowerCase(),
        deadline,
    });
    res.status(201).json(task);
}   catch(error){
    console.error("Error creating task:", error);
        res.status(500).json({ message: "failed to create", error: error.message });
}
};

// TASK BY PROJECT 

exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    //console.log("Fetching tasks for project:", projectId);

    const tasks = await Task.find({ project: projectId })
      .populate("assignedTo", "name email")
      .populate("project", "title");

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("GET TASKS ERROR:", error);
    res.status(500).json({
      message: "failed to fetch tasks",
      error: error.message,
    });
  }
};




// UPDATE TASK STATUS    
  exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const isAssignedUser =
      task.assignedTo &&
      task.assignedTo.toString() === req.user.id;

    const isAdmin = req.user.role === "admin";

    if (!isAssignedUser && !isAdmin) {
      return res.status(403).json({
        message: "Forbidden: You cannot update this task",
      });
    }

    task.status = status;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);
    res.status(500).json({
      message: "Failed to update",
      error: error.message,
    });
  }
};

// GET MY TASKS
exports.getMyTasks = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate("project", "title")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("GET MY TASKS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch your tasks",
      error: error.message,
    });
  }
};