const express = require('express');
const postController = require('../controllers/postController');
const upload  = require("../midderware/uploadImg");
const auth = require("../midderware/auth")

const postRouter = express.Router();


postRouter.post('/create' ,auth, upload.single('image'), postController.createPost);
postRouter.get('/getAllPost' ,auth, postController.getAllPosts);
postRouter.get('/:id' ,auth, postController.getPostById);
postRouter.delete('/:id' ,auth,  postController.deletePost);
postRouter.put('/:id' ,auth, postController.updatePost);



module.exports  = postRouter;