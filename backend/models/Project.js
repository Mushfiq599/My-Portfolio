const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  image: {
    type: String,
    required: [true, 'Please provide a project image']
  },
  technologies: [{
    type: String
  }],
  liveLink: {
    type: String,
    default: null
  },
  githubLink: {
    type: String,
    default: null
  },
  featured: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'fullstack', 'frontend', 'backend'],
    default: 'fullstack'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
