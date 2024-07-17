const express=require('express');
const router=express.Router();

const todoRouter=require('./todoRouter');
const authRouter=require('./authRouter');

router.use('/todo',todoRouter);
router.use('/user',authRouter);

module.exports=router