const express = require('express')
const router = express.Router();
const zod = require("zod");
const { Task } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const bcrypt = require("bcrypt");
const { authMiddleware } = require('../middleware');



const taskBody = zod.object({
    userid: zod.string(),
    subordinateid: zod.string(),
    name: zod.string(),
    task: zod.string(),
    submissiondate: zod.string(),
});

router.post("/assigntask", authMiddleware, async (req, res) => {
    // Input validation check
    const result = taskBody.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "Input specified in incorrect format"
        });

    }

    // When both checks are successful, add user to the database
    const task = await Task.create({
        userid: req.body.userid,
        subordinateid: req.body. subordinateid,
        name:req.body.name,
        task: req.body.task,
        submissiondate: req.body.submissiondate,
        status:0,
        completedtaskmessage:""
    });

    res.json({
        message: "Task Submitted successfully",
    });
});





router.get("/taskdetails", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId; // Assuming authMiddleware sets userId in req

        // Find all tasks where subordinateid matches userId
        const taskDetails = await Task.find({ subordinateid: userId });

        if (!taskDetails || taskDetails.length === 0) {
            return res.status(404).json({ message: "Tasks not found for this user" });
        }

        // Prepare response with relevant task details
        const formattedTasks = taskDetails.map(task => ({
            taskid: task._id,
            taskassignedby: task.userid,
            taskassignedto: task.subordinateid,
            taskassignedtoname: task.name,
            task: task.task,
            submissiondate: task.submissiondate,
        }));

        res.json({ tasks: formattedTasks });
    } catch (error) {
        console.error("Error fetching user tasks:", error);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;