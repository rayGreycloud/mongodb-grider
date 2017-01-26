const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length >= 3,
      message: 'Name must be at least 3 characters.'
    },
    required: [true, 'Name is required.']
  },
  postCount: Number,
  // Embedded subdocuments from posts
  posts: [PostSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
