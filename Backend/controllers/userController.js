const express = require("express");
const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const jwt = require('jsonwebtoken');
require('dotenv').config();

//const auth = require("../midderware/auth");

exports.singnup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser._id });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user1 = await User.findOne({ email });
    console.log("user email", user1)
    if (!user1) {
      return res.status(401).json({ message: 'Invalid credentials: User not found' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user1.password);
    console.log("Password match:", isPasswordCorrect);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials: Incorrect password' });
    }
    const token = jwt.sign({ userId: user1._id, email : user1.email, username :  user1.username  }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, userId: user1._id, email : user1.email, username :  user1.username});
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};



exports.userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    console.log(user);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile', error: err.message });
  }
};




exports.userFollw = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow || !currentUser) return res.status(404).json({ message: 'User not found' });

    if (!currentUser.following.includes(userToFollow._id)) {
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
      await currentUser.save();
      await userToFollow.save();
    }
    res.json({ message: 'Followed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error following user', error: err.message });
  }
};




exports.userUnfollw = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.userId);

    if (!userToUnfollow || !currentUser) return res.status(404).json({ message: 'User not found' });

    currentUser.following = currentUser.following.filter((id) => id.toString() !== userToUnfollow._id.toString());
    userToUnfollow.followers = userToUnfollow.followers.filter((id) => id.toString() !== currentUser._id.toString());

    await currentUser.save();
    await userToUnfollow.save();

    res.json({ message: 'Unfollowed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error unfollowing user', error: err.message });
  }
};