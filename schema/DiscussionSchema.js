const mongoose = require('mongoose');
const { Schema } = mongoose;

const discussionSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  comment: [{
    name: {
      type: String,
    },
    comment: {
      type: String,
    }
  }]
});

module.exports = mongoose.model('discussion', discussionSchema);