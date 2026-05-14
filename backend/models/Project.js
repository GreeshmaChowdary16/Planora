const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  techStack: [{ type: String }],
  roadmap: [
    {
      step: { type: Number },
      title: { type: String },
      desc: { type: String }
    }
  ],
  components: [{ type: String }],
  procedure: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
