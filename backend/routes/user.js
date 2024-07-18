const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const bcrypt = require("bcrypt");
const { authMiddleware } = require('../middleware');

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

router.post("/signup", async (req, res) => {
    // Input validation check
    const result = signupBody.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "Input specified in incorrect format"
        });
        
    }

    // Existing user check
    const existingUser = await User.findOne({
        username: req.body.username
    });

    if (existingUser) {
        return res.status(409).json({
            message: "Existing user"
        });
    }

    const hashedpassword = await bcrypt.hash(req.body.password, 10);

    // Note: Email verification is still left which happens nowadays on every website.

    // When both checks are successful, add user to the database
    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedpassword,
        position: "Member",
        positionseniorityindex: 1,
    });

    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    });
});

//signin route

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {

    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Input specified in Incorrect format"
        })
    }

    const test_user = await User.findOne({
        username: req.body.username
    })

    if (!test_user) {
        return res.status(401).json({
            message: "Not a registered User"
        })
    }

    //console.log("All good till here 1");


    const isPasswordValid = await bcrypt.compare(req.body.password, test_user.password);



    if (isPasswordValid) {
        const token = jwt.sign({
            userId: User._id
        }, JWT_SECRET);

        return res.status(200).json({
            message: "Welcome User, You are logged in",
            token: token
        })
    }

    res.status(401).json({
        message: "Password Incorrect"
    })


})


//update route

// const updateBody = zod.object({
//     password:zod.string().optional(),
//     firstName:zod.string().optional(),
//     lastName:zod.string().optional(),
// })

// router.put("/update",authMiddleware,async(req,res) => {
//     const {success} = updateBody.safeParse(req.body)

//     if(!success){
//         return res.status(411).json({
//              message: "Input specified in wrong format"
//         })
//     }

//     await User.updateOne({_id:req.userId}, req.body);

//     res.json({
//         message:"Details updated successfully"
//     })
// })



router.get("/details", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const userDetails = await User.findById(userId);

        if (!userDetails) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            user: {
                username: userDetails.username,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                _id: userDetails._id,
                position: userDetails.position,
                positionseniorityindex: userDetails.positionseniorityindex
            }
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//Route to send the details of the users to appear on the user's page according to searching
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
            position:user.position,
            positionseniorityindex:user.positionseniorityindex
        }))
    })
})

module.exports = router;