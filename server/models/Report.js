const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportId: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  incidentType: {
    type: String,
    required: true,
    enum: ['verbal', 'physical', 'online', 'workplace', 'public', 'other']
  },
  description: {
    type: String,
    required: true
  },
  location: {
    address: String,
    lat: Number,
    lng: Number
  },
  dateTime: {
    type: Date,
    required: true
  },
  evidence: [{
    type: String, // file URLs
  }],
  status: {
    type: String,
    enum: ['pending', 'under_review', 'resolved'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);