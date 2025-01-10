const express = require('express');
const userController = require('../controllers/userController');
const auth  =require("../midderware/auth");
const upload  = require("../midderware/uplodeImg");
const userRouter = express.Router();



userRouter.post('/signup' , userController.singnup);
userRouter.post('/login',auth ,userController.singnup);
userRouter.get("/profile/:id", auth , userController.userProfile);
userRouter.get("/:id/follow", auth , userController.userUnfollw);
userRouter.get("/:id/unfollow", auth , userController.userFollw);



module.exports = userRouter;
