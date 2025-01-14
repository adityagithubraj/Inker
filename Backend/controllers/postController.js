const express = require("express");
const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const jwt = require('jsonwebtoken');
const generateAIImage = require("./imageGen");

require('dotenv').config();
const Post = require("../models/postModel")


exports.createPost = async (req, res) => { 
  try {
    let post_img = '';

    // Check if a file was uploaded
    if (req.file && req.file.filename) {
      post_img = req.file.filename;
    } else if (req.body.subject) {
      // If no file, generate an AI image based on the subject
      post_img = await generateAIImage(req.body.subject);
      console.log("this img url from OPENAI ", post_img );
    }

    
    const { subject, details  } = req.body;

    generateAIImage(subject);

    const newPost = new Post({
      author: req.user.userId,
      subject,
      details,
      imageUrl: post_img,
    });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', postId: newPost._id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
};


exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email'); // Populate author details
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate('author', 'name email'); // Populate author details
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching post', error: err.message });
  }
};


exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this post' });
    }
    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting post', error: err.message });
  }
};


exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, details } = req.body;
    let updatedData = { subject, details };

    // Update image if provided
    if (req.file && req.file.filename) {
      updatedData.imageUrl = req.file.filename;
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You are not authorized to update this post' });
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
  } catch (err) {
    res.status(500).json({ message: 'Error updating post', error: err.message });
  }
};
