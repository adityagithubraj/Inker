const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
