const express = require('express');
const postController = require('../controllers/postController');
const auth  =require("../middlewares/authenticat");
const upload  = require("../midderware/uplodeImg");

const postRouter = express.Router();


postRouter.post('/create',auth ,upload.single('image'), userController.singnup);



module.exports  = postRouter;