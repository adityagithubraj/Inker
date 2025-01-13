const express = require('express');
const postController = require('../controllers/postController');
const upload  = require("../midderware/uploadImg");

const postRouter = express.Router();


postRouter.post('/create' ,upload.single('image'), postController.createPost);



module.exports  = postRouter;