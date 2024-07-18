const express = require('express')
const userRouter = require('./user')
const taskRouter = require('./task')
const adminRouter = require('./admin')

const router=express.Router();

router.use('/user',userRouter);
router.use('/task',taskRouter);
router.use('/admin',adminRouter);

module.exports = router;