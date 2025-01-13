const express = require("express");
const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Post = require("../models/postModel")


exports.createPost = async (req, res) => {
    try {
      const { subject, details } = req.body;
      const newPost = new Post({
        author: "6784b4788fd2aecdda341d95",
        subject,
        details,
        imageUrl: req.imageUrl,
      });  
      await newPost.save();  
      res.status(201).json({ message: 'Post created successfully', postId: newPost._id });
    } catch (err) {
      res.status(500).json({ message: 'Error creating post', error: err.message });
    }
  };
  

  // exports.authenticateJWT, async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id);
  //     if (!post) return res.status(404).json({ message: 'Post not found' });
  
  //     if (!post.likes.includes(req.user.userId)) {
  //       post.likes.push(req.user.userId);
  //       await post.save();
  //     }
  
  //     res.json({ message: 'Post liked successfully' });
  //   } catch (err) {
  //     res.status(500).json({ message: 'Error liking post', error: err.message });
  //   }
  // });
  
  // app.post('/post/:id/comment', authenticateJWT, async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id);
  //     if (!post) return res.status(404).json({ message: 'Post not found' });
  
  //     post.comments.push({ user: req.user.userId, comment: req.body.comment });
  //     await post.save();
  
  //     res.json({ message: 'Comment added successfully' });
  //   } catch (err) {
  //     res.status(500).json({ message: 'Error adding comment', error: err.message });
  //   }
  // });
  
  // Search Route
  // app.get('/search', async (req, res) => {
  //   try {
  //     const { query } = req.query;
  //     const results = await esClient.search({
  //       index: 'blogs',
  //       query: {
  //         multi_match: {
  //           query,
  //           fields: ['subject', 'details'],
  //         },
  //       },
  //     });  
  //     res.json({ results: results.hits.hits.map((hit) => hit._source) });
  //   } catch (err) {
  //     res.status(500).json({ message: 'Error searching posts', error: err.message });
  //   }
  // });