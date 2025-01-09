const express = require('express');
const userController = require('../controllers/userController');
const auth  =require("../middlewares/authenticat");
const upload  = require("../midderware/uplodeImg");
const uploadPaySlip = require("../middlewares/amountReqMW")
const userRouter = express.Router();



userRouter.post('/signup',auth ,userController.singnup);
userRouter.post('/login',auth ,userController.singnup);
userRouter.get("/profile/:id", auth , userController.userProfile);
userRouter.get("/:id/follow", auth , userController.userUnfollw);
userRouter.get("/:id/unfollow", auth , userController.userFollw);



module.exprots = userRouter;