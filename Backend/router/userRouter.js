const express = require('express');
const userController = require('../controllers/userController');
const auth  =require("../midderware/auth");
const upload  = require("../midderware/uploadImg");
const userRouter = express.Router();



userRouter.post('/signup' , userController.singnup);
userRouter.post('/login',userController.login);
userRouter.get("/profile/:id" , userController.userProfile);
userRouter.get("/:id/follow" , userController.userUnfollw);
userRouter.get("/:id/unfollow" , userController.userUnfollw);



module.exports = userRouter;
