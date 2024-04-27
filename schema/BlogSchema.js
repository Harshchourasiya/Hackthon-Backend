const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
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
    }],
    likes: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('blog', BlogSchema);