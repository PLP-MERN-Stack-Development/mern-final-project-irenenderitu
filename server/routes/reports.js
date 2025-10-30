const express = require('express');
const Report = require('../models/Report');
const { auth, adminAuth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Create report
router.post('/', auth, upload.array('evidence', 5), async (req, res) => {
  try {
    const { incidentType, description, location, dateTime, isAnonymous } = req.body;
    
    const reportId = 'RPT' + Date.now();
    const evidenceFiles = req.files ? req.files.map(file => file.path) : [];

    const report = new Report({
      reportId,
      userId: req.user._id,
      isAnonymous: isAnonymous === 'true',
      incidentType,
      description,
      location: JSON.parse(location),
      dateTime,
      evidence: evidenceFiles
    });

    await report.save();
    await report.populate('userId', 'name email');

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's reports
router.get('/my-reports', auth, async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all reports (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update report status (admin only)
router.patch('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('userId', 'name email');
    
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get reports for map
router.get('/map', async (req, res) => {
  try {
    const reports = await Report.find({ 
      'location.lat': { $exists: true },
      'location.lng': { $exists: true }
    }).select('location incidentType dateTime status');
    
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;