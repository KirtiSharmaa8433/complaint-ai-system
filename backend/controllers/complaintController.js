const Complaint = require('../models/Complaint');
const { analyzeText } = require('./aiController');

exports.addComplaint = async (req, res, next) => {
  try {
    const aiAnalysis = analyzeText(req.body);

    const complaint = await Complaint.create({
      ...req.body,
      aiAnalysis
    });

    res.status(201).json({
      success: true,
      message: 'Complaint stored successfully',
      complaint
    });
  } catch (e) {
    next(e);
  }
};

exports.getComplaints = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = new RegExp(req.query.category, 'i');
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: complaints.length,
      complaints
    });
  } catch (e) {
    next(e);
  }
};

exports.updateComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.json({
      success: true,
      message: 'Updated status shown',
      complaint
    });
  } catch (e) {
    next(e);
  }
};

exports.deleteComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.json({
      success: true,
      message: 'Complaint removed'
    });
  } catch (e) {
    next(e);
  }
};

exports.searchByLocation = async (req, res, next) => {
  try {
    const { location = '' } = req.query;

    const complaints = await Complaint.find({
      location: new RegExp(location, 'i')
    });

    res.json({
      success: true,
      count: complaints.length,
      complaints
    });
  } catch (e) {
    next(e);
  }
};