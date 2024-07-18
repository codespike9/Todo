const express=require('express');
const router=express.Router();
const jwt=require('../middlewares/jwtMiddleware');

const { addTask, updateTask, changeTaskStatus, deleteTask, getAllTasks, getAllCompletedTaks, getAllPendingTaks}=require('../controllers/todoController');

router.post('/add-task',jwt.verifyAccessToken,addTask);
router.patch('/update-task',jwt.verifyAccessToken,updateTask);
router.patch('/change-status/:id',jwt.verifyAccessToken,changeTaskStatus);
router.delete('/delete-task/:id',jwt.verifyAccessToken,deleteTask);
router.get('/my-tasks',jwt.verifyAccessToken,getAllTasks);
router.get('/pending-tasks',jwt.verifyAccessToken,getAllPendingTaks);
router.get('/completed-tasks',jwt.verifyAccessToken,getAllCompletedTaks);

module.exports=router