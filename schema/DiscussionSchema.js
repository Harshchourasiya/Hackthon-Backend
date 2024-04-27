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
  des: {
    type: String,
    required: true
  },
  comment: [{
    name: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }]
});

module.exports = mongoose.model('discussion', discussionSchema);